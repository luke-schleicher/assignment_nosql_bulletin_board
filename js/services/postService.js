BulletinBoard.factory("postService", ['$http', '_', function($http, _) {
  var posts = {};

  var _getAll = function _getAll() {
    if(!_.isEmpty(posts)) {
      return new Promise(function(resolve) {
        resolve(posts)
      });
    } else {
      return $http({
        method: 'GET',
        url: '/data/posts.json'
      }).then( function(response) {
        return angular.copy(response.data, posts); // Why do we do this??
      });
    }
  }

  var getPostForId = function getPostForId(id) {
    return _getAll().then(function(posts) {
      return posts[id];
    });
  }

  return {
    getPostForId: getPostForId,
  }

}]);
