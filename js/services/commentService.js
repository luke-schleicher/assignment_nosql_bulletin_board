BulletinBoard.factory("commentService", ['$http', function($http) {
  var comments;

  var _getAll = function _getAll() {
    if(comments) {
      return new Promise(function(resolve) {
        resolve(comments)
      });
    } else {
      return $http({
        method: 'GET',
        url: '/data/comments.json'
      }).then( function(response) {
        return comments = response.data;
      });
    }
  };

  var getCommentsByIds = function getCommentsByIds(ids) {
    return _getAll().then(function(response) {

      var commentArr = [];
      for(var i = 0; i < ids.length; i++) {
        commentArr.push(comments[ String(ids[i]) ]);
      }

      return commentArr;
    });
  };

  return {
    getCommentsByIds: getCommentsByIds,
  };

}]);
