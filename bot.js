
const Discord = require('discord.js');
const client = new Discord.Client();

var prefix = process.env.prefix;

client.on('ready', () => {
  console.log(`BOT: ${client.user.username} adı ile giriş yaptı!`);
});

client.on('message', msg => {
  console.log(`LOG: S: ${msg.guild.name} M: ${msg.content} Y: ${msg.author.tag}`);
  if (msg.author.id === process.env.id) return;
  if (msg.author.bot) return;

  if (!msg.content.startsWith(prefix)) {
	  return;
  }
  if (msg.content.toLowerCase() === prefix + 'ping') {
    msg.reply('Pong! **' + client.ping + '** ms');
  }
//Koruma
client.on("message", msg => {
  if (msg.content.toLowerCase().match(/(discord\.gg\/)|(discordapp\.com\/invite\/)/g) && !msg.author.bot && msg.channel.type === "text" && msg.channel.permissionsFor(msg.guild.member(client.user)).has("MANAGE_MESSAGES")) {
    msg.delete(30).then(deletedMsg => {
      deletedMsg.reply(":x: Discord davet linki paylaştığını algıladık. Bu sunucu ProRehberTR tarafından korunmakta. :x: ").catch(e => {
        console.error(e);
      });
    }).catch(e => {
      console.error(e);
    });
  }
});
//Koruma
//temizleme
  if (msg.content.toLowerCase() === prefix + 'temizle') {
    msg.channel.bulkDelete(100);
    msg.channel.sendMessage("100 adet mesaj silindi!");
  }
//temizleme
//yardım
  if (msg.content.toLowerCase() === prefix + 'yardım') {
    msg.channel.sendMessage("Ben özel yapım bir botum ve 7/24 açığım.İşte komutlarım ve özelliklerim ; \np!temizle = 100 adet mesaj siler. \np!ping = Pingimi gösterir. \nAyrıca Reklam korumasıda vardır.");
  }
//yardım
  if (msg.content.toLowerCase() === prefix + 'reboot') {
    if (msg.author.id !== process.env.sahip) {
      msg.reply('Benim yapımcım değilsin!');
    } else {
      msg.channel.sendMessage(`Bot yeniden başlatılıyor...`).then(msg => {
      console.log(`BOT: Bot yeniden başlatılıyor...`);
      process.exit(0);
    })
   }
  }
});

client.login(process.env.BOT_TOKEN);
