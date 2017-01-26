BulletinBoard.factory("commentService", ['$http', "userService", "_",
function($http, userService, _) {

  var _comments = [];
  var users = {};
  var _id;

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

  var _setId = function() {
    var maxId = 0;
    _comments.forEach(function(element, index) {
      if (element.id > maxId) {
        maxId = element.id;
      }
    });
    return _id = maxId;
  }

  var _getNextId = function() {
    if (_id) {
      return _id + 1;
    } else {
      return _setId() + 1;
    }
  }

  var _findOrInitializeAuthor = function(name) {
    for (var user in users) {
      if (user.name === name) {
        return user;
      }
    }
    var user = userService.createUser(name);
    users.push(user);
    return user;
  };

  var createComment = function(comment) {
    var newComment = {};
    newComment.body = comment.body;
    newComment.score = 0;
    newComment.id = _getNextId();
    newComment.post_id = 0;
    newComment.author = _findOrInitializeAuthor(comment.authorName);
    newComment.author_id = newComment.author.id;
    newComment.created_at = Date.now();
    _comments.push(newComment);
    _id++;
    return newComment;
  };

  return {
    getCommentsByIds: getCommentsByIds,
    getAll: getAll,
    getComments: getComments,
    createComment: createComment
  };

}]);
