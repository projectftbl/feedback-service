var _ = require('lodash')
  , sceneskope = require('@ftbl/sceneskope')
  , Feedback = require('../repositories/feedback');

var TYPES = [
  { type: 'promote', list: 'listByContentIdForMember', group: 'moderator' }
, { type: 'neutral', list: 'listByContentIdForMember', group: 'moderator' }
, { type: 'hide', list: 'listByContentIdForMember', group: 'moderator' }
, { type: 'like', list: 'listByContentIdForMember', group: 'member' }
, { type: 'dislike', list: 'listByContentIdForMember', group: 'member' }
, { type: 'love', list: 'listByContentIdForMember', group: 'member' }
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
      , group = _.pluck(_.filter(TYPES, { group: type.group }), 'type')
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