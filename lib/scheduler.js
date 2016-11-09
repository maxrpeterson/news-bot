const loopInterval = 10 * 1000;
let controller;

function loop() {
  const now = Date.now();
  setImmediate(fireScheduledEvents, now);
  setTimeout(loop, loopInterval);
}

function fireScheduledEvents(now) {
  console.log(now);
}

function init(_controller) {
  controller = _controller;
  loop();
}

module.exports = {
  init
};
