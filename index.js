if (!process.env.BOT_TOKEN) {
  console.error('**ERROR**');
  console.error('Please add your bot user token to your env vars with the name "BOT_TOKEN"');
  process.exit(1);
}
const Botkit = require('botkit');
const controller = Botkit.slackbot({
  json_file_store: './db'
});
const bot = controller.spawn({
  token: process.env.BOT_TOKEN
});

controller.hears('hello', ['direct_message', 'direct_mention'], (bot, message) => {
  bot.reply(message, 'hello!');
});

bot.startRTM((err, bot, payload) => {
  if (err) {
    console.error(err);
    throw new Error('Could not connect to Slack');
  }
});
