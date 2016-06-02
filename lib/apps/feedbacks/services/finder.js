var Promise = require('bluebird')
  , Feedback = require('../repositories/feedback');

var Finder = function(context) {
  if (this instanceof Finder === false) return new Finder(context);

  this.context = context;
};

Finder.prototype.find = Promise.method(function(query) {
  if (query.memberid && query.contentids) return Feedback.listByContentIdsForMember(query.contentids, query.memberid, query);
  if (query.contentids) return Feedback.listByContentIds(query.contentids, query);
  if (query.memberid && query.contentid) return Feedback.listByContentIdForMember(query.contentid, query.memberid, query);
  if (query.contentid) return Feedback.listByContentId(query.contentid, query);

  return [];
});

module.exports = Finder;