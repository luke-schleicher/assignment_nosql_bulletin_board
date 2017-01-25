BulletinBoard.controller("recentCommsCtrl", ['$scope', 'commentService',
function($scope, commentService) {

  commentService.getAll()
    .then(function(comments) {
      console.log("recent comments", comments)
      $scope.comments = comments;
    });
}]);
