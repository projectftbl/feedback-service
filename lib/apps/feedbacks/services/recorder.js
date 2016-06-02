var _ = require('lodash')
  , sceneskope = require('@ftbl/sceneskope')
  , Feedback = require('../repositories/feedback');

var TYPES = [
  { type: 'promote', list: 'listByContentId' }
, { type: 'neutral', list: 'listByContentId' }
, { type: 'hide', list: 'listByContentId' }
, { type: 'like', list: 'listByContentIdForMember' }
, { type: 'dislike', list: 'listByContentIdForMember' }
, { type: 'love', list: 'listByContentIdForMember' }
];

var Recorder = function(context) {
  if (this instanceof Recorder === false) return new Recorder(context);

  this.context = context;
};

Recorder.prototype.record = function(feedback) {
  var context = this.context
    , type = _.find(TYPES, { type: feedback.type });

  if (type == null) return;

  return Feedback[type.list](feedback.contentId, feedback.memberId).then(function(feedbacks) {
    var types = _.pluck(feedbacks, 'type')
      , group = _.pluck(_.filter(TYPES, { list: type.list }), 'type')
      , matched = _.intersection(types, group);

    feedback.recordedBy = context.session.id;
    feedback.recordedAt = new Date;

    if (matched.length) {
      var previous = _.find(feedbacks, { type: matched[0] });
      return Feedback.update(previous.id, feedback).then(function(feedback) {
        sceneskope('feedback', { feedback: feedback, previous: previous }, context);
        return feedback;
      });
    };

    return Feedback.create(feedback).then(function(feedback) {
      sceneskope('feedback', { feedback: feedback }, context);
      return feedback;
    });
  });
};

module.exports = Recorder;