const Database = require('better-sqlite3');
const db = new Database('bot.sqlite');

module.exports = db;