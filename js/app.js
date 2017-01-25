var BulletinBoard = angular.module('BulletinBoard', []);

BulletinBoard.factory('_', ['$window', function($window) {
  return $window._;
}]);
