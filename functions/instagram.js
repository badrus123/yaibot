const bot = require('./../bot.js');
const instagram = require('./../template/instagram.js');
const request = require('request'); //HTTP Request

module.exports = {
  profile: function (replyToken, text, source) {
    var replyText = bot.replyText;
    var client = bot.client;
    var username = text.replace('ig: ', '').toLowerCase();
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
          if (pagination) {
            let endCursor = result.edge_owner_to_timeline_media.page_info.end_cursor;
            var hehe = JSON.stringify(flex);
            flex.contents.footer = {"type": "box","layout": "vertical","spacing": "xs","contents": [{"type": "button","action": {"type": "postback","label": "See More","data": "data=instagram&type=page&username=" + username + "&flex=" + hehe + "&url=" + endCursor,"text": "See More"}}]}
          }
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
        console.log(JSON.stringify(flex));
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
    var media = res.url;
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
  pagination: function (replyToken, username, url, before, source) {
    var replyText = bot.replyText;
    var client = bot.client;
    var flex = {
      "type": "flex",
      "altText": "Menu YaiBot",
      "contents": {
        "type": "carousel",
        "contents": []
      }
    };
    console.log(JSON.stringify(before));
    flex.contents.contents.push(before);
    request({
      url: 'https://www.instagram.com/' + username + '/?__a=1&max_id=' + url,
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
        var postingan = result.edge_owner_to_timeline_media.edges;
        flex.contents.contents.push(instagram.pagination());
        var limit = 0;
        var baris = 0;
        var arr = [];
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
            flex.contents.contents[1].body.contents.push(line);
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
          flex.contents.contents[1].body.contents.push(line);
          for (var i = 0; i < 3-limit; i++) {
            flex.contents.contents[1].body.contents[baris].contents.push({"type":"filler"});
          }
        }
        console.log(JSON.stringify(flex));
        return client.replyMessage(replyToken, flex);
      }
    });
  }
};
