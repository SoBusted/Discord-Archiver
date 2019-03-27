const Config    = require('../config.json');
const https     = require('https');
const fs        = require('fs');

module.exports.download = attachment => {
    let archive = Config.ARCHIVE_FOLDER;

    if (!fs.existsSync(archive)) {
        console.error(`folder ${archive} does not exists`);

        return;
    }

    let guild = attachment.message.guild.name;
    let today = new Date().toJSON().slice(0,10);

    createDirectory(`${archive}/${guild}`);
    createDirectory(`${archive}/${guild}/${today}`);

    let filename = attachment.filename;
    let sender = attachment.message.author.username;
    let destination = `${archive}/${guild}/${today}/${sender}_${attachment.id}_${filename}`;
    let file = fs.createWriteStream(destination);
    let request = https.get(attachment.url, res => {
        res.pipe(file);

        file.on('finish', () => {
            file.close();

            console.log(`downloaded file: ${filename}`);
        });
    });

    request.on('error', err => {
        fs.unlink(destination);

        console.error(`error occurred: ${err.message}`);
    });

    console.log(`[${guild}] user ${sender} sended file: ${filename}`);
};

function createDirectory(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}
