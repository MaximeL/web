angular.module('webClientSideApp')
  .controller('AuthenticationCtrl', function ($scope, $location, $cookies, $notification, user) {
    if ($location.path() == "/sign-out") {
      if ($cookies.get("user") !== undefined) {
        $cookies.remove("user");
        $notification.success("Success:", "You have been disconnected.");
      }
      $location.path('/sign-in');
    }
    /**
     * Create a new user in DB.
     */
    $scope.signUp = function () {
      if (
        $scope.user != undefined &&
        $scope.user.username != undefined &&
        $scope.user.email != undefined &&
        $scope.user.password != undefined
      ) {
        // TODO : hash pwd
        user.create($scope.user, '/sign-in')
      } else {
        $notification.error("Error::", "All field are not correctly filled.")
      }
    };

    /**
     * Verify existence of user in DB.
     */
    $scope.signIn = function () {
      if (
        $scope.user != undefined &&
        $scope.user.username != undefined &&
        $scope.user.password != undefined
      ) {
        // TODO : hash pwd
        user.login($scope.user, '/');
      }
    };
  });
