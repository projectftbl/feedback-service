module.exports = {
  required: true
, type: 'object'
, properties: {
    contentId: { required: true, type: 'string' }
  , type: { required: true, type: 'string' }
  , memberId: { type: 'string' }
  , recordedBy: { required: true, type: 'string' }
  , recordedAt: { required: true, type: 'string', format: 'date-time' }
  } 
};