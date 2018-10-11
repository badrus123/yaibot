const bot = require('./../bot.js');
const request = require('request'); //HTTP Request

module.exports = {
  profile: function (foto, username, followedBy, following, post, fullName, bio, website) {
    flex = {
      "type": "flex",
      "altText": "Profile " + username,
      "contents": {
        "type": "bubble",
        "body": {
          "type": "box",
          "layout": "vertical",
          "spacing": "md",
          "contents": [
            {
              "type": "box",
              "layout": "horizontal",
              "margin": "md",
              "contents": [
                {
                  "type": "image",
                  "url": foto,
                  "aspectMode": "cover",
                  "margin": "xs",
                  "size": "xxs",
                  "action": {
                    "type": "postback",
                    "label": "Photo Profile",
                    "data": "data=instagram&type=photo&url=" + foto,
                    "text": "Download photo profile"
                  },
                },
                {
                  "type": "text",
                  "text": username,
                  "size": "xl",
                  "color": "#696969",
                  "margin": "md",
                  "flex": 6
                }
              ]
            },
            {
              "type": "box",
              "layout": "horizontal",
              "margin": "md",
              "contents": [
                {
                  "type": "text",
                  "text": post + " posts",
                  "size": "sm",
                  "margin": "sm",
                  "flex": 0
                },
                {
                  "type": "filler"
                },
                {
                  "type": "text",
                  "text": followedBy + " followers",
                  "size": "sm",
                  "margin": "sm",
                  "flex": 0
                },
                {
                  "type": "filler"
                },
                {
                  "type": "text",
                  "text": following + " following",
                  "size": "sm",
                  "margin": "sm",
                  "flex": 0
                }
              ]
            }
          ]
        }
      }
    };
    if (fullName == "") fullName = "-";
    if (bio == "") bio = "-";
    displayurl =  website;
    if (website == null) {
      displayurl = "-";
      website = "https://instagram.com/"
    }
    flex.contents.body.contents.push({
      "type": "box",
      "layout": "vertical",
      "margin": "lg",
      "spacing": "sm",
      "contents": [
        {
          "type": "text",
          "text": fullName,
          "wrap": true,
          "weight": "bold",
          "size": "md",
          "color": "#666666",
          "flex": 4
        },
        {
          "type": "text",
          "text": bio,
          "wrap": true,
          "size": "sm",
          "color": "#666666",
          "flex": 4
        },
        {
          "type": "text",
          "text": displayurl,
          "wrap": true,
          "size": "sm",
          "color": "#0b5ed8",
          "flex": 4,
          "action": {
            "type": "uri",
            "label": "Add to wishlist",
            "uri": website
          }
        }
      ]
    },
    {
      "type": "box",
      "layout": "horizontal",
      "margin": "lg",
      "spacing": "sm",
      "contents": [
        {
          "type": "text",
          "text": "Posts",
          "weight": "bold",
          "wrap": true,
          "size": "sm",
          "color": "#0b5ed8",
          "align": "center",
          "flex": 1
        },
        {
          "type": "separator"
        },
        {
          "type": "text",
          "text": "Tagged",
          "wrap": true,
          "size": "sm",
          "align": "center",
          "flex": 1
        }
      ]
    },
    {
      "type": "box",
      "layout": "horizontal",
      "margin": "lg",
      "spacing": "sm",
      "contents": [
        {
          "type": "spacer"
        }
      ]
    });
    return flex;
  },
  post: function (media, isVideo) {
    var type;
    if (isVideo) type = 'video'
    else type = 'photo'
    flex = {
      "type": "image",
      "url": media,
      "aspectMode": "cover",
      "margin": "xs",
      "size": "xl",
      "action": {
         "type":"postback",
         "label":"Download photo",
         "data":"data=instagram&type=" + type + "&url=" + media,
         "text": "Download photo"
      }
    };
    return flex;
  },
  line: function () {
    flex = {
      "type": "box",
      "layout": "horizontal",
      "margin": "xs"
    };
    return flex;
  },
  stories: function (username, taken, media, previewMedia, isVideo) {
    const moment = require('moment');
    var client = bot.client;
    moment.locale('id');
    var date = moment(new Date(1539177634 * 1000).toISOString()).calendar();
    flex = {
      "type": "bubble",
      "header":{
        "type": "box",
        "layout": "baseline",
        "contents": [
          {
            "type": "icon",
            "size": "xl",
            "url": foto
          },
          {
            "type": "text",
            "text": username,
            "size": "xl",
            "color": "#696969",
            "margin": "md",
            "flex": 0
          },
          {
            "type": "text",
            "text": date,
            "size": "md",
            "color": "#696969",
            "margin": "md",
            "align": "end"
          }
        ]
      },
      "hero": {
        "type": "image",
        "size": "full",
        "aspectMode": "cover",
        "aspectRatio": "9:16",
        "action": {
          "type": "postback",
          "label": "See More",
          "data": "data=instagram&type=stories&url=" + media + "&preview=" + previewMedia,
          "text": "See More"
        },
        "url": media
      }
    };
    return flex;
  },
  pagination: function(username, page) {
    flex = {
      "type": "flex",
      "altText": username + " page " + page.toString,
      "contents": {
        "type": "bubble",
        "body": {
          "type": "box",
          "layout": "vertical",
          "spacing": "md",
          "contents": [
            {
              "type": "box",
              "layout": "baseline",
              "margin": "md",
              "contents": [
                {
                  "type": "text",
                  "text": username,
                  "size": "xl",
                  "color": "#696969",
                  "margin": "md",
                  "flex": 0
                },
                {
                  "type": "text",
                  "text": "page " + page,
                  "size": "sm",
                  "color": "#696969",
                  "margin": "md",
                  "align": "end"
                }
              ]
            },
            {
              "type": "box",
              "layout": "baseline",
              "margin": "md",
              "contents": [
                {
                  "type": "spacer"

                }
              ]
            }
          ]
        }
      }
    };
    return flex;
  }
};
