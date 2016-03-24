module.exports = function(router, resource, middleware, errors) {
  var feedbacks = resource.feedbacks(middleware, errors);
  
  router.post('/', feedbacks.post);
};
