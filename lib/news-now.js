const newsApi = require('./news-api');
const matches = [
  /(?:latest )?news/,
  /(?:what are the )?(?:latest|top) ?(?:headlines|stories)/,
  /(?:what's the )?latest(?: news)?/
];

function getNewsListener(bot, message) {
  newsApi.topStories().then(news => {
    const top5 = news.stories.slice(0, 5);
    let response = 'Hey! Here are the top 5 latest news stories:\n';
    top5.forEach(story => {
      let storyMsg = `*${story.headline}*\n` +
                     `_read more:_ ${story.url}\n`;
      response += storyMsg;
    });
    bot.reply(message, response);
  });
}

function init(controller) {
  controller.hears(
    matches,
    ['direct_message', 'direct_mention'],
    getNewsListener
  );
}

module.exports = {
  init
};
