module.exports = function(router, resource, middleware, errors) {
  var feedbacks = resource.feedbacks(middleware, errors);
  
  router.get('/', feedbacks.get);
  router.post('/', feedbacks.post);
};
