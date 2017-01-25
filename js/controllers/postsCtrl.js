BulletinBoard.controller("postsCtrl", ['$scope', 'postService', 'userService',
function($scope, postService, userService) {

  postService.getPostForId('0')
    .then(function(post) {

      $scope.post = post;

      var author_id = String(post.author_id);

      userService.getUserById(author_id)
        .then(function(author) {
          $scope.author = author;
        });
        
    });

}]);
