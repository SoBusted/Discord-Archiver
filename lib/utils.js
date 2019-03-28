const Config    = require('../config.json');
const https     = require('https');
const fs        = require('fs');

const REGEX_ILLEGAL          = /[\/\\:\*\?"<>\|]/g;
const REGEX_CONTROL          = /[\x00-\x1f\x80-\x9f]/g;
const REGEX_RESERVED         = /^\.+$/;
const REGEX_WINDOWS_RESERVED = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;
const REGEX_WINDOWS_TRAILING = /[\. ]+$/;

module.exports.download = attachment => {
    let archive = Config.ARCHIVE_FOLDER;

    if (!fs.existsSync(archive)) {
        console.error(`folder ${archive} does not exists`);

        return;
    }

    let isDirectMessage = attachment.message.guild === null;
    let today = new Date().toJSON().slice(0,10);
    let sender = sanitize(attachment.message.author.username, '');
    let filename = sanitize(attachment.filename, '');
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
        guild = sanitize(attachment.message.guild.name, '');
        channel = sanitize(attachment.message.channel.name, '');

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

function sanitize(input, replacement) {
    let sanitized = input
        .replace(REGEX_ILLEGAL, replacement)
        .replace(REGEX_CONTROL, replacement)
        .replace(REGEX_RESERVED, replacement)
        .replace(REGEX_WINDOWS_RESERVED, replacement)
        .replace(REGEX_WINDOWS_TRAILING, replacement);

    return sanitized ? sanitized : 'null';
}
