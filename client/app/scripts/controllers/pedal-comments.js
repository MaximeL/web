'use strict';
angular.module('webClientSideApp')
  .controller('PedalCommentCtrl', function (config, $route, $routeParams, $http, $scope, $cookies, $notification, md5) {
    $http.get(config.apiURL + config.pedals + $routeParams.id)
      .success(function (response) {
        $scope.pedal = response;
        var comments = $scope.pedal.comments;
        comments.forEach(function (comment) {
          $http.get(config.apiURL + config.users + comment._id)
            .success(function (response) {
              comment.username = response.username;
              comment.email = response.email;
            })
            .error(function (response) {
              console.log(response);
            })
        })
      })
      .error(function (response) {
        $notification.error("Error", "Could not retreive data from server. (" + response.message + ")");
        $location.path('/');
      });

    $scope.user = $cookies.getObject("user");
    $scope.hashEmail = function (email) {
      if (email === undefined) {
        return "";
      }
      return md5.createHash(email);
    };


    $scope.save = function () {
      var data = {
        author: $scope.user.id,
        content: $scope.comment
      };

      console.log($scope.pedal.comments);
      console.log($scope.user);
      $scope.pedal.comments.push({
        username: $scope.user.username,
        email: $scope.user.email,
        comment: $scope.comment
      });
      $http.post(config.apiURL + config.pedals + $routeParams.id + config.pedal_comments, data)
        .success(function (response) {
          $notification.success("Congratulations", "Your comment has been saved.");
          $route.reload();
        })
        .error(function (response) {
          $notification.error("Error", "An error occured. (" + response.message + ")")
        })
    }
  });
