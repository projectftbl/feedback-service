var log = require('@ftbl/log')
  , Recorder = require('../services/recorder');

var Listener = function(queue) {
  if (this instanceof Listener === false) return new Listener(queue);

  this.queue = queue;
};

var logError = function(err) {
  log.error(err.message, err.stack);
};

Listener.prototype.listen = function() {
  this.queue.on('data', function(feedback, options) {
    var recorder = new Recorder(options);
    recorder.record(feedback);
  });

  this.queue.on('error', logError);

  this.queue.listen('feedback');
};

module.exports = Listener;