const bot = require('./../bot.js');
const igracias = require('./../template/igracias.js');
const request = require('request'); //HTTP Request

module.exports = {
  profile: function (replyToken, text, source) {
    var replyText = bot.replyText;
    var client = bot.client;
    var username = text.replace('ig: ', '');
    request('https://instagram.com/' + username + "/?__a=1", function (error, response, body) {
      var result = JSON.parse(body);
      let foto = result.graphql.user.profile_pic_url_hd;
      let followedBy = result.graphql.user.edge_followed_by.count;
      let following = result.graphql.user.edge_follow.count;
      let post = result.graphql.user.edge_owner_to_timeline_media;
      let fullName = result.graphql.user.full_name;
      let bio = result.graphql.user.biography;
      let url = result.graphql.user.external_url;
      return client.replyMessage(replyToken, {
          "type": "image",
          "originalContentUrl": foto,
          "previewImageUrl": foto
      });
    });
  }
};
