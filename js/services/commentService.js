BulletinBoard.factory("commentService", "userService", ['$http',
function($http, userService) {
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
      var comment, strId;
      for(var i = 0; i < ids.length; i++) {
        strId = String(ids[i]);

        userService.getUserById(comments[strId].author_id).then(
          function(author) {
            comments[strId].author = author;
          }
        );
        
        commentArr.push(commments[strId]);
      }

      return commentArr;
    });
  };

  return {
    getCommentsByIds: getCommentsByIds,
  };

}]);
