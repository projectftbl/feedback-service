var redis = require('@ftbl/redis').connection
  , Validator = require('@ftbl/store').Validator
  , schema = require('../schemas/feedback');

var Recorder = function(context) {
  if (this instanceof Recorder === false) return new Recorder(context);

  this.context = context;
  this.validator = new Validator(schema);
};

Recorder.prototype.record = function(feedback) {
  if (this.validator.validate(feedback) === false) return;

  var key = 'feedback:' + feedback.contentId
    , field = feedback.score
    , score = {
        'positive': 1
      , 'neutral': 0
      , 'negative': -1
      }[field];

  redis.hincrby(key, field, 1).then(function() {
    redis.hincrby(key, 'count', score);
  });
};

module.exports = Recorder;