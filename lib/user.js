const controller = require('./controller');
const storage = controller.storage;

function promiseCallback(resolve, reject) {
  return (err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  };
}

function all() {
  return new Promise((resolve, reject) => {
    storage.users.all(promiseCallback(resolve, reject));
  });
}

function find(id) {
  return new Promise((resolve, reject) => {
    storage.users.get(id, promiseCallback(resolve, reject));
  });
}

function destroy(id) {
  return new Promise((resolve, reject) => {
    storage.users.delete(id, err => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}

function save(data) {
  return new Promise((resolve, reject) => {
    storage.users.save(data, err => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}

module.exports = {
  all,
  find,
  'delete': destroy,
  save
};

// controller.storage.users.save({id: message.user, foo:'bar'}, function(err) { ... });
// controller.storage.users.get(id, function(err, user_data) {...});
// controller.storage.users.delete(id, function(err) {...});
// controller.storage.users.all(function(err, all_user_data) {...});
