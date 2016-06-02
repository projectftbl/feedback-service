var Recorder = require('../services/recorder')
  , Finder = require('../services/finder');

module.exports = function(middleware, errors) {
  
  return { 
    get: function *(next) {
      var finder = new Finder(this.context);

      this.status = 200;

      this.body = { feedbacks: yield finder.find(this.request.query) }; 
    }

  , post: function *(next) {
      var recorder = new Recorder(this.context);

      this.status = 200;
      this.body = { feedback: yield recorder.record(this.request.body.feedback) }; 
    }
  };
};
