const bot = require('./../bot.js');
const request = require('request'); //HTTP Request

module.exports = {
  dashboard: function (replyToken) {
    var client = bot.client;
    var flex = {
      "type": "flex",
      "altText": "Menu YaiBot",
      "contents": {
        "type": "carousel",
        "contents": [
          {
            "type": "bubble",
            "styles": {
              "header": {
                "backgroundColor": "#1D2951"
              },
              "footer": {
                "backgroundColor": "#1D2951"
              }
            },
            "hero": {
              "type": "image",
              "size": "full",
              "aspectRatio": "20:13",
              "aspectMode": "cover",
              "url": "https://en.instagram-brand.com/wp-content/uploads/2016/11/BRC_Image.jpg"
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": "Instagram",
                  "wrap": true,
                  "weight": "bold",
                  "size": "md"
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "contents": [
                    {
                      "type": "icon",
                      "url": "https://telubot.herokuapp.com/images/icon/label.png",
                      "size": "md"
                    },
                    {
                      "type": "text",
                      "text": "Hiburan",
                      "margin": "md",
                      "wrap": true,
                      "color": "#aaaaaa",
                      "size": "sm",
                      "flex": 0
                    }
                  ]
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "contents": [
                    {
                      "type": "icon",
                      "url": "https://telubot.herokuapp.com/images/icon/lampu.png",
                      "size": "md"
                    },
                    {
                      "type": "text",
                      "text": "Stalk Instagram Orang Sabi",
                      "wrap": true,
                      "margin": "md",
                      "color": "#aaaaaa",
                      "size": "sm",
                      "flex": 0
                    }
                  ]
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "spacer",
                      "size": "xl"
                    }
                  ]
                }
              ]
            },
            "footer": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "button",
                  "color": "#ffffff",
                  "style": "link",
                  "action": {
                    "type": "message",
                    "label": "Mulai Stalk",
                    "text": "Stalk Instagram"
                  }
                }
              ]
            }
          },
          {
            "type": "bubble",
            "styles": {
              "header": {
                "backgroundColor": "#1D2951"
              },
              "footer": {
                "backgroundColor": "#1D2951"
              }
            },
            "hero": {
              "type": "image",
              "size": "full",
              "aspectRatio": "20:13",
              "aspectMode": "cover",
              "url": "https://yaibot.herokuapp.com/images/logo/tubo.jpg"
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": "Tel-U Bot",
                  "wrap": true,
                  "weight": "bold",
                  "size": "md"
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "contents": [
                    {
                      "type": "icon",
                      "url": "https://telubot.herokuapp.com/images/icon/label.png",
                      "size": "md"
                    },
                    {
                      "type": "text",
                      "text": "Chatbot Lain",
                      "margin": "md",
                      "wrap": true,
                      "color": "#aaaaaa",
                      "size": "sm"
                    }
                  ]
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "contents": [
                    {
                      "type": "icon",
                      "url": "https://telubot.herokuapp.com/images/icon/lampu.png",
                      "size": "md"
                    },
                    {
                      "type": "text",
                      "text": "Liat Jadwal, Absensi, Bikin To-Do List Juga Sabi",
                      "wrap": true,
                      "margin": "md",
                      "color": "#aaaaaa",
                      "size": "sm"
                    }
                  ]
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "spacer",
                      "size": "xl"
                    }
                  ]
                }
              ]
            },
            "footer": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "button",
                  "color": "#ffffff",
                  "style": "link",
                  "action": {
                    "type": "uri",
                    "label": "Chat Tel-U Bot",
                    "uri": "line://ti/p/@qfk6231q"
                  }
                }
              ]
            }
          },
          {
            "type": "bubble",
            "styles": {
              "header": {
                "backgroundColor": "#1D2951"
              },
              "footer": {
                "backgroundColor": "#1D2951"
              }
            },
            "hero": {
              "type": "image",
              "size": "full",
              "aspectRatio": "20:13",
              "aspectMode": "cover",
              "url": "https://yaibot.herokuapp.com/images/logo/screenshot_dikampus.jpg"
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": "Dikampus",
                  "wrap": true,
                  "weight": "bold",
                  "size": "md"
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "contents": [
                    {
                      "type": "icon",
                      "url": "https://telubot.herokuapp.com/images/icon/label.png",
                      "size": "md"
                    },
                    {
                      "type": "text",
                      "text": "Chatbot Lain",
                      "margin": "md",
                      "wrap": true,
                      "color": "#aaaaaa",
                      "size": "sm"
                    }
                  ]
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "contents": [
                    {
                      "type": "icon",
                      "url": "https://telubot.herokuapp.com/images/icon/lampu.png",
                      "size": "md"
                    },
                    {
                      "type": "text",
                      "text": "Pesen Makan Kalo Laper",
                      "wrap": true,
                      "margin": "md",
                      "color": "#aaaaaa",
                      "size": "sm"
                    }
                  ]
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "spacer",
                      "size": "xl"
                    }
                  ]
                }
              ]
            },
            "footer": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "button",
                  "color": "#ffffff",
                  "style": "link",
                  "action": {
                    "type": "uri",
                    "label": "Chat Dikampus",
                    "uri": "line://ti/p/@dikampus.id"
                  }
                }
              ]
            }
          },
          {
            "type": "bubble",
            "styles": {
              "header": {
                "backgroundColor": "#1D2951"
              },
              "footer": {
                "backgroundColor": "#1D2951"
              }
            },
            "hero": {
              "type": "image",
              "size": "full",
              "aspectRatio": "20:13",
              "aspectMode": "cover",
              "url": "https://yaibot.herokuapp.com/images/logo/iyai.jpg"
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": "Owner YaiBot",
                  "wrap": true,
                  "weight": "bold",
                  "size": "md"
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "contents": [
                    {
                      "type": "icon",
                      "url": "https://telubot.herokuapp.com/images/icon/label.png",
                      "size": "md"
                    },
                    {
                      "type": "text",
                      "text": "Raihan Iyai",
                      "margin": "md",
                      "wrap": true,
                      "color": "#aaaaaa",
                      "size": "sm"
                    }
                  ]
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "contents": [
                    {
                      "type": "icon",
                      "url": "https://telubot.herokuapp.com/images/icon/lampu.png",
                      "size": "md"
                    },
                    {
                      "type": "text",
                      "text": "Follow Aja Instagramnya, Siapa Tau Ada Fitur Baru",
                      "wrap": true,
                      "margin": "md",
                      "color": "#aaaaaa",
                      "size": "sm"
                    }
                  ]
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "spacer",
                      "size": "xl"
                    }
                  ]
                }
              ]
            },
            "footer": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "button",
                  "style": "link",
                  "color": "#ffffff",
                  "action": {
                    "type": "uri",
                    "label": "Follow",
                    "uri": "https://instagram.com/raihaniyai"
                  }
                }
              ]
            }
          }
        ]
      }
    };
    answer = [`Lagi mau ngapain nih? Langsung tap aja yak`, `Gw bisa bantu apa? Langsung tap aja menu nya`, `Apa yang bisa gw bantu nih? Tap aja menu nya yak`, `Sung ae lah tap menu nya wkwk`]
    client.replyMessage(replyToken, [
      {
        "type": "text",
        "text": answer[Math.floor(Math.random()*answer.length)]
      },
      flex
    ]);
  }
};
