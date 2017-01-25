BulletinBoard.controller("postsCtrl", ['$scope', 'postService', 'userService','commentService',
function($scope, postService, userService, commentService) {

  postService.getPostForId('0')
    .then(function(post) {

      $scope.post = post;

      var author_id = String(post.author_id);

      userService.getUserById(author_id)
        .then(function(author) {
          $scope.author = author;
        });

      $scope.comments = commentService.getCommentsByIds($scope.post.comment_ids);

    });
}]);
