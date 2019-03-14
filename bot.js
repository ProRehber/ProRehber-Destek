
const Discord = require('discord.js');
const client = new Discord.Client();

var prefix = process.env.prefix;

client.on('ready', () => {
  console.log(`BOT: ${client.user.username} adı ile giriş yaptı!`);
 client.user.setGame(` ${client.guilds.size} asdasd`);
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
  if (msg.content.toLowerCase() === prefix + 'davet') {
    msg.reply('https://discordapp.com/oauth2/authorize?client_id=408549238734323712&scope=bot&permissions=-1');
  }
//Koruma
client.on("message", msg => {
  if (msg.content.toLowerCase().match(/(discord\.gg\/)|(discordapp\.com\/invite\/)/g) && !msg.author.bot && msg.channel.type === "text" && msg.channel.permissionsFor(msg.guild.member(client.user)).has("MANAGE_MESSAGES")) {
    msg.delete(30).then(deletedMsg => {
      deletedMsg.reply(":x: Discord davet linki paylaştığını algıladık. Bu sunucu ProRehberTR2 tarafından korunmakta. :x: ").catch(e => {
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
    msg.channel.sendMessage("**Ben özel yapım bir botum ve 7/24 açığım.İşte komutlarım ve özelliklerim ; \np!davet = Davet linkimi gösterir. \np!yardım = Bu menüyü açar. \np!temizle = 100 adet mesaj siler. \np!ping = Pingimi gösterir. \nAyrıca Reklam korumasıda vardır. \nBu bot can123123123#9568 tarafından yapılmıştır.**");
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
