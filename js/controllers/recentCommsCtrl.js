BulletinBoard.controller("recentCommsCtrl", ['$scope', 'commentService',
function($scope, commentService) {

  $scope.comments = commentService.getComments();

}]);
