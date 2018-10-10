const bot = require('./../bot.js');
const instagram = require('./../template/instagram.js');
const request = require('request'); //HTTP Request

self = {
  profile: function (replyToken, text, source) {
    var replyText = bot.replyText;
    var client = bot.client;
    var username = text.replace('ig: ', '');
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
        let instagramid = result.id;
        let foto = result.profile_pic_url_hd;
        let followedBy = result.edge_followed_by.count;
        let following = result.edge_follow.count;
        let postCount = result.edge_owner_to_timeline_media.count;
        let fullName = result.full_name;
        let bio = result.biography;
        let website = result.external_url;
        let isPrivate = result.is_private;
        let pagination = result.edge_owner_to_timeline_media.page_info.has_next_page;
        var flex = instagram.profile(foto, username, followedBy, following, postCount, fullName, bio, website);
        var limit = 0;
        var baris = 1;
        var arr = [];
        if (isPrivate) {
          flex.contents.body.contents.pop(); flex.contents.body.contents.pop();
          flex.contents.body.contents.push({"type": "image","url": "https://yaibot.herokuapp.com/images/padlock.png","aspectMode": "cover","margin": "xs","size": "md",},{"type": "text","text": "Digembok cuy.. Sabar aja yak","wrap": true,"align": "center","size": "md",});
        } else {
          if (pagination) {
            let endCursor = result.edge_owner_to_timeline_media.page_info.end_cursor;
            flex.contents.footer = {"type": "box","layout": "vertical","spacing": "xs","contents": [{"type": "button","action": {"type": "postback","label": "See More","data": "data=instagram&type=page&username=" + username + "&id=" + instagramid + "&page=1&url=" + endCursor,"text": "See More"}}]}
          }
          var postingan = result.edge_owner_to_timeline_media.edges;
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
          if (limit < 3 && limit > 0) {
            line = {"type": "box","layout": "horizontal", "margin": "xs"}
            line.contents = arr;
            flex.contents.body.contents.push(line);
            for (var i = 0; i < 3-limit; i++) {
              flex.contents.body.contents[4+baris].contents.push({"type":"filler"});
            }
          }
        }
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
  pagination: function (replyToken, username, page, id, url, source) {
    var replyText = bot.replyText;
    var client = bot.client;
    request({
      url: 'https://www.instagram.com/graphql/query/?query_hash=5b0222df65d7f6659c9b82246780caa7&variables={"id":"' + id + '","first":12,"after":"' + url + '"}',
      method: "GET",
      headers: {
        'Host': 'www.instagram.com',
        'Cookie': process.env.INSTAGRAM_COOKIE,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      },
      json: true
    }, function (error, response, body){
      console.log(JSON.stringify(body));
      if (body.data) {
        var result = body.data.user;
        let pagination = result.edge_owner_to_timeline_media.page_info.has_next_page;
        var postingan = result.edge_owner_to_timeline_media.edges;
        page = parseInt(page);
        page++;
        var flex = instagram.pagination(username, page);
        if (pagination) {
          let endCursor = result.edge_owner_to_timeline_media.page_info.end_cursor;
          flex.contents.footer = {"type": "box","layout": "vertical","spacing": "xs","contents": [{"type": "button","action": {"type": "postback","label": "See More","data": "data=instagram&type=page&username=" + username + "&page=" + page + "&id=" + id + "&url=" + endCursor, "text": "See More"}}]}
        }
        let endCursor = result.edge_owner_to_timeline_media.page_info.end_cursor;
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
            flex.contents.body.contents.push(line);
            arr = [];
            limit = 0;
            baris++;
          } else {
            arr.push(box);
          }
        }
        if (limit < 3 && limit > 0) {
          line = {"type": "box","layout": "horizontal", "margin": "xs"}
          line.contents = arr;
          flex.contents.body.contents.push(line);
          for (var i = 0; i < 3-limit; i++) {
            flex.contents.body.contents[baris].contents.push({"type":"filler"});
          }
        }
        return client.replyMessage(replyToken, flex);
      }
    });
  }
};

module.exports = self;
