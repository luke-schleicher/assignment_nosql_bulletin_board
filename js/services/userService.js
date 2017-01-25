BulletinBoard.factory('userService', ['$http', function($http) {

  var users;

  var _getUsers = function() {

    if (users) {

      return new Promise(function(resolve) {
        resolve(users)
      });

    } else {

      return $http({
        method: 'GET',
        url: '/data/users.json'
      }).then(function(response) {
        return users = response.data;
      });

    }

  };

  var getUserById = function(id) {
    if(typeof id !== "string") id = String(id);
    
    return _getUsers().then(function(users) {
      return users[id];
    });
  };

  return {
    getUserById: getUserById,
  };

}]);
