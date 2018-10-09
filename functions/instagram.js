const bot = require('./../bot.js');
const instagram = require('./../template/instagram.js');
const request = require('request'); //HTTP Request

const profile = (username, isPagination, callback) => {
  request({
    url: 'https://www.instagram.com/' + username + '/?__a=1',
    method: "GET",
    headers: {
      'Host': 'www.instagram.com',
      'Cookie': process.env.INSTAGRAM_COOKIE,
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
    },
    json: true
  }, function (error, response, body){
    if (body.graphql) {
      var result = body.graphql.user;
      let foto = result.profile_pic_url_hd;
      let followedBy = result.edge_followed_by.count;
      let following = result.edge_follow.count;
      let postCount = result.edge_owner_to_timeline_media.count;
      let fullName = result.full_name;
      let bio = result.biography;
      let url = result.external_url;
      let isPrivate = result.is_private;
      let pagination = result.edge_owner_to_timeline_media.page_info.has_next_page;
      var flex = instagram.profile(foto, username, followedBy, following, postCount, fullName, bio, url);
      var limit = 0;
      var baris = 1;
      var arr = [];
      if (isPrivate) {
        flex.contents.body.contents.pop(); flex.contents.body.contents.pop();
        flex.contents.body.contents.push({"type": "image","url": "https://yaibot.herokuapp.com/images/padlock.png","aspectMode": "cover","margin": "xs","size": "md",},{"type": "text","text": "Digembok cuy.. Sabar aja yak","wrap": true,"align": "center","size": "md",});
      } else {
        var postingan = result.edge_owner_to_timeline_media.edges;
        // if (pagination) {
        //   let endCursor = result.edge_owner_to_timeline_media.page_info.end_cursor;
        //   flex.contents.footer = {"type": "box","layout": "vertical","spacing": "xs","contents": [{"type": "button","action": {"type": "postback","label": "See More","data": "data=instagram&type=page&username=" + username + "&page=1&url=" + endCursor,"text": "See More"}}]}
        // }
        for (var post in postingan) {
          res = postingan[post].node;
          media = res.display_url;
          isVideo = res.is_video;
          box = instagram.post(media, isVideo);
          limit++;
          if (limit >= 3) {
            line = {"type": "box","layout": "horizontal","margin": "xs"}
            arr.push(box);
            line.contents = arr;
            flex.contents.body.contents.push(line)
            arr = [];
            limit = 0;
            baris++;
          } else {
            arr.push(box);
          }
        }
        if (limit < 3) {
          line = {"type": "box","layout": "horizontal", "margin": "xs"}
          line.contents = arr;
          flex.contents.body.contents.push(line);
          for (var i = 0; i < 3-limit; i++) {
            flex.contents.body.contents[4+baris].contents.push({"type":"filler"});
          }
        }
      }
      if (isPagination) {
        callback(flex.contents);
      } else {
        callback(flex);
      }
    } else {
      callback(null);
    }
  });
}

// const next = (username, page, url, callback) => {
//   request({
//     url: 'https://www.instagram.com/' + username + '/?__a=1&max_id=' + url,
//     method: "GET",
//     headers: {
//       'Host': 'www.instagram.com',
//       'Cookie': process.env.INSTAGRAM_COOKIE,
//       'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
//     },
//     json: true
//   }, function (error, response, body){
//     if (body.graphql) {
//       var result = body.graphql.user;
//       let pagination = result.edge_owner_to_timeline_media.page_info.has_next_page;
//       var postingan = result.edge_owner_to_timeline_media.edges;
//       var newPage = instagram.pagination();
//       if (pagination) {
//         let endCursor = result.edge_owner_to_timeline_media.page_info.end_cursor;
//         newPage.footer = {"type": "box","layout": "vertical","spacing": "xs","contents": [{"type": "button","action": {"type": "postback","label": "See More","data": "data=instagram&type=page&username=" + username + "&page=" + page + "&url=" + endCursor,"text": "See More"}}]}
//       }
//       let endCursor = result.edge_owner_to_timeline_media.page_info.end_cursor;
//       var limit = 0;
//       var baris = 0;
//       var arr = [];
//       for (var post in postingan) {
//         res = postingan[post].node;
//         media = res.display_url;
//         isVideo = res.is_video;
//         box = instagram.post(media, isVideo);
//         limit++;
//         if (limit >= 3) {
//           line = {"type": "box","layout": "horizontal","margin": "xs"}
//           arr.push(box);
//           line.contents = arr;
//           newPage.body.contents.push(line);
//           arr = [];
//           limit = 0;
//           baris++;
//         } else {
//           arr.push(box);
//         }
//       }
//       if (limit < 3) {
//         line = {"type": "box","layout": "horizontal", "margin": "xs"}
//         line.contents = arr;
//         newPage.body.contents.push(line);
//         for (var i = 0; i < 3-limit; i++) {
//           newPage.body.contents[baris].contents.push({"type":"filler"});
//         }
//       }
//       callback(flex);
//     }
//   });
// }

self = {
  profile: function (replyToken, text, source, isPagination) {
    var replyText = bot.replyText;
    var client = bot.client;
    var username = text.replace('ig: ', '');
    profile(username, false, function(flex){
      if (flex !== null) {
        return client.replyMessage(replyToken, flex);
      } else {
        answer = [`Yakin tuh ig nya? Ga nemu nih gw`, `Ga nemu ig nya nih, typo kali tuh?`, `Wadoo, gw ga nemu ig ${username}`]
        return replyText(replyToken, answer[Math.floor(Math.random()*answer.length)]);
      }
    });
  },
  download: function (replyToken, type, url, source) {
    var replyText = bot.replyText;
    var client = bot.client;
    var media = url;
    if (type == 'photo') {
      return client.replyMessage(replyToken, {
        "type": "image",
        "originalContentUrl": media,
        "previewImageUrl": media
      });
    } else if (type == 'video') {
      return client.replyMessage(replyToken, {
        "type": "image",
        "originalContentUrl": media,
        "previewImageUrl": media
      });
    }
  },
  // pagination: function (replyToken, username, page, source) {
  //   var replyText = bot.replyText;
  //   var client = bot.client;
  //   var flex = {
  //     "type": "flex",
  //     "altText": "Menu YaiBot",
  //     "contents": {
  //       "type": "carousel",
  //       "contents": []
  //     }
  //   };
  //   profile(username, true, function(before){
  //     flex.contents.contents.push(before);
  //     console.log("Masuk profil");
  //     for (var i = 0; i < 1; i++) {
  //       var data = flex.contents.contents[i].footer.contents[0].action.data;
  //       var res = {};
  //       var vars = data.split("&");
  //       for(var i=0; i < vars.length; i++){
  //         var str = vars[i].split("=");
  //         res[str[0]] = str[1];
  //       }
  //       next(username, i, res.url, function(before){
  //         console.log("Masuk Perulangan");
  //         flex.contents.contents.push(before);
  //       });
  //     }
  //     console.log(JSON.stringify(flex));
  //     return client.replyMessage(replyToken, flex);
  //   });
  // }
};

module.exports = self;
