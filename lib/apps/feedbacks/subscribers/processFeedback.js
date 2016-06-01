var log = require('@ftbl/log')
  , Recorder = require('../services/recorder');

var Subscriber = function(queue) {
  if (this instanceof Subscriber === false) return new Subscriber(queue);

  this.queue = queue;
};

var logError = function(err) {
  log.error(err.message, err.stack);
};

Subscriber.prototype.subscribe = function() {
  this.queue.on('data', function(feedback, options) {
    var recorder = new Recorder(options);
    recorder.record(feedback);
  });

  this.queue.on('error', logError);

  this.queue.subscribe('feedback');
};

module.exports = Subscriber;