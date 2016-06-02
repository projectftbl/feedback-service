var inherits = require('util').inherits
  , Base = require('@ftbl/store').Repository
  , schema = require('../schemas/feedback');

var NAME = 'feedback';

var Repository = function() {
  if (this instanceof Repository === false) return new Repository;

  Base.call(this, NAME, schema);
};

inherits(Repository, Base);

Repository.prototype.listByContentIds = function(contentIds, options) {
  return this.find(function(feedback) {
    return feedback.hasFields('memberId').not().and(this.database.expr(contentIds).contains(feedback('contentId')));
  }.bind(this), options);
};

Repository.prototype.listByContentIdsForMember = function(contentIds, memberId, options) {
  return this.find(function(feedback) {
    return feedback('memberId').eq(memberId).and(this.database.expr(contentIds).contains(feedback('contentId')));
  }.bind(this), options);
};

Repository.prototype.listByContentId = function(contentId, options) {
  return this.find(function(feedback) {
    return feedback.hasFields('memberId').not().and(feedback('contentId').eq(contentId));
  });
};

Repository.prototype.listByContentIdForMember = function(contentId, memberId, options) {
  return this.find({ contentId: contentId, memberId: memberId }, options);
};

Repository.prototype.sanitize = function(feedback) {
  if (feedback == null) return;
 
  if (feedback.recordedAt) feedback.recordedAt = new Date(feedback.recordedAt).toISOString();

  return feedback;
};

Repository.prototype.clean = function(feedback) {
  if (feedback == null) return;

  if (feedback.recordedAt) feedback.recordedAt = new Date(feedback.recordedAt);

  return feedback;
};

Repository.prototype.index = function() {
  return this.createIndex('contentId');
};

module.exports = new Repository;
