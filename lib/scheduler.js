const user = require('./user');
const loopInterval = 15 * 1000;

function loop() {
  const now = Date.now();
  setImmediate(fireScheduledEvents, now);
  setTimeout(loop, loopInterval);
}

function fireScheduledEvents(now) {
  console.log(now);
  const usersWithEvents = [];
  user.all().then(users => {
    users.forEach(user => {
      user.subscriptions.forEach(sub => {
        
      });
    });
  });
}

function start() {
  loop();
}

module.exports = {
  start
};

var users = [
  {
    id: 1,
    subscriptions: [
      {
        categories: ['a', 'b'],
        time: '10:00',
        lastSent: ''
      }
    ]
  },
  {
    id: 2,
    subscriptions: [
      {
        categories: ['b', 'c'],
        time: '15:00'
      }
    ]
  },
  {
    id: 3,
    subscriptions: [
      {
        categories: ['a', 'd'],
        time: '10:00'
      }
    ]
  },
];

function concatAll(array) {
  let result = [];
  array.forEach(subArray => {
    if (!subArray.forEach) throw new TypeError('not a 2-dimensional array');
    subArray.forEach(item => {
      if (item !== undefined) result.push(item);
    });
  });
  return result;
}

users.map(user => {
  return user.subscriptions.map(sub => {
    if (sub.time === '10:00') {
      sub.id = user.id;
      return sub;
    }
  });
}).forEach(user => console.log('hello'));
