module.exports = {
  required: true
, type: 'object'
, properties: {
    contentId: { required: true, type: 'string' }
  , score: { required: true, type: 'string', enum: [ 'positive', 'neutral', 'negative' ] }
  }
};