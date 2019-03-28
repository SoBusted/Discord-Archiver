const Config    = require('../config.json');
const https     = require('https');
const fs        = require('fs');

module.exports.download = attachment => {
    let archive = Config.ARCHIVE_FOLDER;

    if (!fs.existsSync(archive)) {
        console.error(`folder ${archive} does not exists`);

        return;
    }

    let isDirectMessage = attachment.message.guild === null;
    let today = new Date().toJSON().slice(0,10);
    let sender = attachment.message.author.username;
    let filename = attachment.filename;
    let guild, channel;

    if (isDirectMessage && Config.IGNORE_DM_FILES) {
        console.log(`ignored DM file: ${filename}`);

        return;
    }

    if (isDirectMessage) {
        console.log(`[DM] user ${sender} sended file: ${filename}`);
        createDirectory(`${archive}/DM`);
        createDirectory(`${archive}/DM/${sender}`);
        createDirectory(`${archive}/DM/${sender}/${today}`);
    } else {
        guild = attachment.message.guild.name;
        channel = attachment.message.channel.name;

        console.log(`[${guild} - ${channel}] user ${sender} sended file: ${filename}`);
        createDirectory(`${archive}/${guild}`);
        createDirectory(`${archive}/${guild}/${channel}`);
        createDirectory(`${archive}/${guild}/${channel}/${today}`);
    }

    let destination = isDirectMessage
        ? `${archive}/DM/${sender}/${today}/${attachment.id}_${filename}`
        : `${archive}/${guild}/${channel}/${today}/${sender}_${attachment.id}_${filename}`;
    let file = fs.createWriteStream(destination);

    https.get(attachment.url, res => {
        res.pipe(file);

        file.on('finish', () => {
            file.close();

            console.log(`downloaded file: ${filename}`);
        });
    }).on('error', err => {
        fs.unlink(destination);

        console.error(`error occurred: ${err.message}`);
    });
};

function createDirectory(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}
