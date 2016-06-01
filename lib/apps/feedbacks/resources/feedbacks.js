var publish = require('@ftbl/task').publish

module.exports = function(middleware, errors) {
  
  return { 
    post: function *(next) {
      publish('feedback', this.request.body.feedback, this.context);

      this.status = 200;
      this.body = { feedback: this.request.body.feedback }; 
    }
  };
};