BulletinBoard.factory("commentService", ['$http', "userService", "_",
function($http, userService, _) {

  var comments = {};
  var users = {};

  userService.getUsers()
    .then(function(response) {
      angular.copy(response, users);
    });

  var getAll = function getAll() {
    if(!_.isEmpty(comments)) {
      return new Promise(function(resolve) {
        resolve(comments)
      });
    } else {
      return $http({
        method: 'GET',
        url: '/data/comments.json'
      }).then( function(response) {

        return angular.copy(response.data, comments);
      });
    }
  };

  var getCommentsByIds = function getCommentsByIds(ids) {
    return getAll().then(function(response) {

      var commentArr = [];
      var comment, strId;

      for(var i = 0; i < ids.length; i++) {
        strId = String(ids[i]);
        comments[strId].author = users[ String(comments[strId].author_id) ];

        commentArr.push(comments[strId]);
      }

      return commentArr;
    });
  };

  return {
    getCommentsByIds: getCommentsByIds,
    getAll: getAll,
  };

}]);
