// categories:
// cover (top stories), world, sports, politics, business, technology,
// science, entertainment, health
const get = require('http').get;
const apiUrlBase = 'api.newsblock.io';
const categories = [
  'topStories',
  'world',
  'sports',
  'politics',
  'business',
  'technology',
  'science',
  'entertainment',
  'health'
];
const categoryMap = {topStories: 'cover'}; // `cover` is actually used for the top stories

function getNews(_category) {
  const category = categoryMap[_category] || _category;
  const promise = new Promise((resolve, reject) => {
    get({
      hostname: apiUrlBase,
      path: `/api/${category}`,
      headers: {
        'Content-Type': 'application/json'
      }
    }, res => {
      if (res.statusCode !== 200) {
        console.error(`error receiving json, error code: ${res.statusCode}`);
        return reject({httpStatusCode: res.statusCode});
      }
      let rawData = '';
      res.on('data', chunk => rawData += chunk);
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
          resolve(parsedData);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', e => {
      console.error(`got error: ${e}`);
      reject(e);
    });
  });
  return promise;
}

const api = {
  getNews,
  categories: categories.map(cat => {
    let result = cat.replace(/([A-Z])/g, (match, ltr) => {
      return ` ${ltr}`;
    });
    return `${result[0].toUpperCase()}${result.slice(1)}`;
  })
};
categories.forEach(cat => {
  api[cat] = () => {
    return getNews(cat);
  };
});

module.exports = api;
