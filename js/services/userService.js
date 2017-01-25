BulletinBoard.factory('userService', ['$http','_', function($http,_) {

  var users = {};

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

  return {
    getUserById: getUserById,
    getUsers: getUsers
  };

}]);
