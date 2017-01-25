BulletinBoard.factory("commentService", ['$http', "userService", "_",
function($http, userService, _) {

  var _comments = [];
  var users = {};

  userService.getUsers()
    .then(function(response) {
      angular.copy(response, users);
    });

  // split getAll into 2 functions
  // 1 fetches the data from api
  // 1 returns comments object

  var getAll = function getAll() {
    return $http({
      method: 'GET',
      url: '/data/comments.json'
    }).then( function(response) {
      angular.copy([], _comments);

      for(var id in response.data) {
        _comments.push(response.data[id]);
      }
    });
  };

  getAll();

  var getComments = function() {
    return _comments;
  };

  var getCommentsByIds = function getCommentsByIds(ids) {

    var commentArr = [];
    var strId;

    for (var i = 0; i < ids.length; i++) {
      for(var j = 0; j < _comments.length; j++) {
        if (_comments[j].id === ids[i]) {
          _comments[j].author = users[ String(_comments[j].author_id) ];
          commentArr.push(_comments[j]);
          break;
        }
      }
    }

    return commentArr;
  };

  return {
    getCommentsByIds: getCommentsByIds,
    getAll: getAll,
    getComments: getComments,
  };

}]);
