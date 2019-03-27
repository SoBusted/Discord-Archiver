const Config    = require('./config.json');
const discord   = require('discord.js');
const utils     = require('./lib/utils.js');
const bot       = new discord.Client();

bot.on('ready', async () => {
    console.log(`Logged in as ${bot.user.tag}`);

    bot.user.setActivity('Attachments', {type: 'listening'});
});

bot.on('message', async message => {
    if (message.author.bot) {
        return;
    }

    if (message.channel.type === 'dm') {
        return;
    }

    if (message.attachments) {
        message.attachments.forEach(attachment => {
            if (attachment.filesize > 0) {
                utils.download(attachment);
            }
        });
    }
})

bot.login(Config.TOKEN);
