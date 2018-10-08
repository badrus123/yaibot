const bot = require('./../bot.js');
const request = require('request'); //HTTP Request

module.exports = {
  profile: function (foto, username, followedBy, following, post, fullName, bio, url) {
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
              "layout": "baseline",
              "margin": "md",
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
    if (url == null) url = "-";
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
          "text": url,
          "wrap": true,
          "size": "sm",
          "color": "#0b5ed8",
          "flex": 4
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
  post: function (media) {
    flex = {
      "type": "image",
      "url": media,
      "aspectMode": "cover",
      "margin": "xs",
      "size": "xl",
      "action": {
        "type": "uri",
        "label": "See More",
        "uri": "https://linecorp.com"
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
  }
};
