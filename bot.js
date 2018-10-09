'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const firebase = require("firebase-admin");
const instagram = require('./functions/instagram.js');
const postbackig = require('./postback/instagram.js');
const menu = require('./template/menu.js');
require('dotenv').config();

// service account key for firebase
var serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY);

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// base URL for webhook server
const baseURL = process.env.BASE_URL;

// create LINE SDK client
const client = new line.Client(config);
module.exports.client = client;

// create Express app
const app = express();

// initialize Firebase
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL
});
const db = firebase.database();
module.exports.database = db;

//Webhook Callback
app.post('/callback', line.middleware(config), (req, res) => {
  // req.body.events should be an array of events
  if (!Array.isArray(req.body.events)) {
    return res.status(500).end();
  }

  // handle events separately
  Promise.all(req.body.events.map(handleEvent))
  .then(() => res.end())
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  });
});

// Simple Reply Function
const replyText = (token, texts) => {
  texts = Array.isArray(texts) ? texts : [texts];
  return client.replyMessage(
    token,
    texts.map((text) => ({ type: 'text', text }))
  );
};
module.exports.replyText = replyText;

// callback function to handle a single event
function handleEvent(event) {
  console.log(JSON.stringify(event)); //Heroku Event Log
  switch (event.type) {
    case 'message':
    const message = event.message;
    if (event.source.type !== 'user') {
      if (event.source.type == 'group') id = event.source.groupId;
      else if (event.source.type == 'room') id = event.source.roomId;
      var ref = db.ref("statistik/"+event.source.type+"/"+id);
      ref.once("value", function(snapshot) {
        if(!snapshot.val()) ref.set({'timestamp': event.timestamp});
      });
    }
    client.getProfile(event.source.userId).then((profile) => console.log(profile.displayName+': '+profile.pictureUrl)); //Heroku Log Photo Profile User
    switch (message.type) {
      case 'text':
      return handleText(message, event.replyToken, event.source);
      break;
      default:
      throw new Error(`Unknown message: ${JSON.stringify(message)}`);
    }
    break;
    case 'follow':
    var updateRef = db.ref("statistik/adders");
    updateRef.transaction(function(adders) {
      return (adders || 0) + 1;
    });
    return client.getProfile(event.source.userId)
    .then((profile) => client.replyMessage(
      event.replyToken,
      [
        {
          "type": "text",
          "text": `Hai ${profile.displayName}!`
        },
        {
          "type": "text",
          "text": `Kenalin gw iyai, mahasiswa Telkom University (IF '16)`
        },
        {
          "type": "text",
          "text": `Mau stalking instagram orang nih yaa? Follow dulu lah ig raihaniyai wkwk`
        },
        {
          "type": "text",
          "text": `Jangan lupa add chatbot gw yang lain yaa\n\nTel-U Bot: line://ti/p/@qfk6231q\nDikampus: line://ti/p/@dikampus.id`,
          "quickReply": {
            "items": [
              {
                "type": "action",
                "action": {
                  "type": "message",
                  "label": "Menu YaiBot",
                  "text": "Menu"
                }
              },
              {
                "type": "action",
                "action": {
                  "type": "message",
                  "label": "How to use",
                  "text": "How to use"
                }
              }
            ]
          }
        }
      ]
    ));
    break;
    case 'unfollow':
    var updateRef = db.ref("statistik/adders");
    updateRef.transaction(function(adders) {
      return (adders) - 1;
    });
    return console.log(`Unfollowed this bot: ${JSON.stringify(event)}`);
    break;
    case 'join':
    var updateRef = db.ref("statistik/" + event.source.type + "/total");
    updateRef.transaction(function(total) {
      return (total || 0) + 1;
    });
    var id;
    if (event.source.type == 'group') id = event.source.groupId;
    else if (event.source.type == 'room') id = event.source.roomId;
    var ref = db.ref("statistik/" + event.source.type + "/" + id);
    ref.set({'timestamp': event.timestamp});
    return client.replyMessage(
      event.replyToken,
      [
        {
          "type": "text",
          "text": `Halo guys, kenalin gw iyai. Gw bisa bantu stalking instagram orang nih, kalo ga percaya ketik 'Menu' aja :D`
        },
        {
          "type": "text",
          "text": `Tapi sebelum stalk ig orang, follow ig gw dulu lah haha (siapa tau ada fitur baru ya kan).\n\nig: raihaniyai`
        },
        {
          "type": "text",
          "text": `Ohiya, sekalian add chatbot gw yang lain nih\n\nTel-U Bot: line://ti/p/@qfk6231q\nDikampus: line://ti/p/@dikampus.id`,
          "quickReply": {
            "items": [
              {
                "type": "action",
                "action": {
                  "type": "message",
                  "label": "Menu",
                  "text": "Menu"
                }
              },
              {
                "type": "action",
                "action": {
                  "type": "message",
                  "label": "How to use",
                  "text": "How to use"
                }
              }
            ]
          }
        }
      ]
    );
    break;
    case 'leave':
    var updateRef = db.ref("statistik/" + event.source.type + "/total");
    updateRef.transaction(function(total) {
      return (total) - 1;
    });
    var id;
    if (event.source.type == 'group') id = event.source.groupId;
    else if (event.source.type == 'room') id = event.source.roomId;
    var ref = db.ref("statistik/" + event.source.type + "/" + id);
    ref.remove();
    return console.log(`Left: ${JSON.stringify(event)}`);
    break;
    case 'postback':
    let data = event.postback.data;
    if (data === 'DATE' || data === 'TIME' || data === 'DATETIME') {
      data += `(${JSON.stringify(event.postback.params)})`;
    } else if (data === 'cancel') {
      return replyText(replyToken, 'Okee gw batalin')
    } else if (data === 'leftGroup') {
      return replyText(event.replyToken, 'Okee, gw pamit dulu guys')
      .then(() => client.leaveGroup(event.source.groupId));
    } else if (data === 'leftRoom') {
      return replyText(event.replyToken, 'Okee, gw pamit dulu guys')
      .then(() => client.leaveRoom(event.source.roomId));
    } else if (data.startsWith("data=")) {
      var res = {};
      var vars = data.split("&");
      for(var i=0; i < vars.length; i++){
        var str = vars[i].split("=");
        res[str[0]] = str[1];
      }
      if (res.data == 'instagram') {
        return postbackig.response(event.replyToken, res, event.source);
      }
    }
    break;
    default:
    throw new Error(`Unknown event: ${JSON.stringify(event)}`);
  }
}

function handleText(message, replyToken, source) {
  text = message.text.toLowerCase();
  if (text == 'bye') {
    switch (source.type) {
      case 'user':
      return replyText(replyToken, 'Ini kan pc :(');
      case 'group':
      return client.replyMessage(replyToken, {
        type: 'template',
        altText: 'Konfirmasi Leave Group',
        template: {
          type: 'confirm',
          text: 'Yakin mau ngekick gw?',
          actions: [
            { label: 'Gajadi', type: 'message', text: 'Gajadi' },
            { label: 'Yakin', type: 'postback', data: 'leftGroup', text: 'Kick' },
          ],
        },
      });

      case 'room':
      return client.replyMessage(replyToken, {
        type: 'template',
        altText: 'Konfirmasi Leave Group',
        template: {
          type: 'confirm',
          text: 'Yakin mau kick Tubo?',
          actions: [
            { label: 'Gajadi', type: 'message', text: 'Gajadi' },
            { label: 'Yakin', type: 'postback', data: 'leftRoom', text: 'Kick' },
          ],
        },
      });
    }
  } else if (text.startsWith('ig: ')) {
    return instagram.profile(replyToken, message.text, source);
  } else if (text == 'menu') {
    return menu.dashboard(replyToken, message.text, source);
  }
}

var staticFile = require('path').join(__dirname,'/public');
app.use(express.static(staticFile));

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
