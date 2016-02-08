angular.module('webClientSideApp')
  .controller('AuthenticationCtrl', function ($scope, $cookies, $notification, user) {
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
        $notification.error("Erreur:", "Les champs du formulaire ne sont pas correctement remplis")
      }
    };

    /**
     * Verify existence of user in DB.
     */
    $scope.signIn = function() {
      if(
        $scope.user != undefined &&
        $scope.user.username != undefined &&
        $scope.user.password != undefined
      ) {
        // TODO : hash pwd
        user.login($scope.user, '/');
      }
    }

    function login() {
      vm.dataLoading = true;
      AuthenticationService.Login(vm.username, vm.password, function (response) {
        if (response.success) {
          AuthenticationService.SetCredentials(vm.username, vm.password);
          $location.path('/');
        } else {
          FlashService.Error(response.message);
          vm.dataLoading = false;
        }
      });
    };
  });
