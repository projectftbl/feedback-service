var broadcast = require('@ftbl/bus').broadcast

module.exports = function(middleware, errors) {
  
  return { 
    post: function *(next) {
      broadcast('feedback', this.request.body.feedback, this.context);

      this.status = 200;
      this.body = { feedback: this.request.body.feedback }; 
    }
  };
};