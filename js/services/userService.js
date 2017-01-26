BulletinBoard.factory('userService', ['$http','_', function($http,_) {

  var users = {};
  var _id; 

  var getUsers = function() {

    if (!_.isEmpty(users)) {

      return new Promise(function(resolve) {
        resolve(users)
      });

    } else {

      return $http({
        method: 'GET',
        url: '/data/users.json'
      }).then(function(response) {
        return angular.copy(response.data, users);
      });

    }

  };

  var getUserById = function(id) {
    if(typeof id !== "string") id = String(id);

    return getUsers().then(function(users) {
      return users[id];
    });
  };

  var _setId = function() {
    var maxId = 0;
    users.forEach(function(element, index) {
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

  var createUser = function(name) {
    var newUser = {};
    newUser.name = name;
    newUser.id = _getNextId();
    users.push(newUser);
    _id++;
    return newUser;
  };

  return {
    getUserById: getUserById,
    getUsers: getUsers,
    createUser: createUser
  };

}]);
