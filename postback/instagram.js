const bot = require('./../bot.js');

var self = {
  response: function (replyToken, res, source) {
    var replyText = bot.replyText;
    var client = bot.client;
    var type = res.type;
    var url = res.url;
    switch (type) {
      case 'photo':
      case 'video':
      return instagram.download(replyToken, type, url, source);
      break;
      case 'page':
      return instagram.pagination(replyToken, url);
      break;
      });
      break;
    }
  }
};

module.exports = self;
