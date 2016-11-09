const Botkit = require('botkit');
const controller = Botkit.slackbot({
  json_file_store: __dirname + '/../db'
});

module.exports = controller;
