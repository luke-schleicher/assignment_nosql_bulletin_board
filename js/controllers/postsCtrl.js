BulletinBoard.controller("postsCtrl", ['$scope', 'postService',
function($scope, postService) {
  $scope.post = postService.getPostForId('0');
}]);
