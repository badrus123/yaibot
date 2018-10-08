const bot = require('./../bot.js');
const igracias = require('./../functions/igracias.js');
const template = require('./../template/igracias.js');

var self = {
  response: function (replyToken, res, userId) {
    var replyText = bot.replyText;
    var client = bot.client;
    var menu = res.menu;
    var db = bot.database;
    switch (menu) {
      case 'profile':
      return igracias.profile(replyToken, userId);
      break;

      case 'jadwal':
      return igracias.jadwal(replyToken, userId);
      break;

      case 'presensi':
      return igracias.presensi(replyToken, userId);
      break;

      case 'kalender':
      return template.kalender(replyToken, userId);
      break;

      case 'rfid':
      return igracias.rfid(replyToken, userId);
      break;

      case 'nilai':
      return igracias.nilai(replyToken, userId);
      break;

      case 'logout':
      var ref = db.ref("user/igracias/"+userId+"/key");
      ref.remove();
      client.getProfile(userId).then((profile) => {
        return client.replyMessage(replyToken, [
          {
              "type": "text",
              "text": `Okee, kak ${profile.displayName} berhasil logout :D`,
              "quickReply": {"items": [{"type": "action","action": {"type":"message","label":"Login iGracias","text":"Dashboard iGracias Bot"}},{"type": "action","action": {"type":"message","label":"Menu Tel U Bot","text":"Menu"}}]}
          }
        ])
      });
      break;
    }
  }
};

module.exports = self;
