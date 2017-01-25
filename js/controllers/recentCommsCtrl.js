BulletinBoard.controller("recentCommsCtrl", ['$scope', 'commentService',
function($scope, commentService) {

  $scope.comments = commentService.getComments();
  setTimeout( function(){console.log("recent comments", $scope.comments)}, 500);

}]);
