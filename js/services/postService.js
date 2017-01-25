BulletinBoard.factory("postService", ['$http', function($http) {
  var posts;

  var _getAll = function _getAll() {
    if(posts) {
      return new Promise(function(resolve) {
        resolve(posts)
      });
    } else {
      return $http({
        method: 'GET',
        url: '/data/posts.json'
      }).then( function(response) {
        return posts = response.data; // Why do we do this??
      });
    }
  }

  var getPostForId = function getPostForId(id) {
    _getAll().then(function() {

    })
  }

  return {
    getPostForId: getPostForId,
  }
}]);
