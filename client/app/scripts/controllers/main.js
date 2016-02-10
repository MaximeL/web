'use strict';

/**
 * @ngdoc function
 * @name webClientSideApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webClientSideApp
 */
angular.module('webClientSideApp')

  .controller('MainCtrl', function ($scope, $cookies, $uibModal, md5, NodeStorage, $http, $notification, $log, user, pedal, $location, config) {
    $scope.user = $cookies.getObject('user');
    if ($scope.user === undefined) {
      $location.path("/sign-in");
    } else {
      /**
       * Recup des pedales pour un user
       */
      $http.get(config.apiURL + config.users + $scope.user.id)
        .success(function (response) {
          $scope.user.pedals = response.pedals;
          $scope.user.shared = response.shared;

          var pedals = $scope.user.pedals;
          $scope.user.pedals = [];
          // Pour chaque pédales possédées
          pedals.forEach(function (pedal) {
            $http.get(config.apiURL + config.pedals + pedal._id)
              .success(function (response) {
                var item = {
                  _id: response._id,
                  name: response.name,
                  description: response.description
                };
                var users = response.users;
                // Pour chaque utilisateur de la pédale
                users.forEach(function (user) {
                  $http.get(config.apiURL + config.users + user._id)
                    .success(function (response) {
                      user.email = response.email;
                    })
                    .error(function (response) {

                    });
                });
                item.users = users;

                // TODO : Rating
                var rating = response.rating;
                var moy = 0;
                rating.forEach(function (r) {
                  moy += r.rate;
                });
                moy /= rating.length;
                item.rating = moy;

                // TODO Comments
                var comments = response.comments;
                //comments.forEach(function(comment) {
                //
                //});

                $scope.user.pedals.push(item);
              }).error(function (response) {
            });
          });

          var shared = $scope.user.shared;
          $scope.user.shared = [];
          // Pour chaque pédale partagée
          shared.forEach(function (pedal) {
            $http.get(config.apiURL + config.pedals + pedal._id)
              .success(function (response) {
                var item = {
                  _id: response._id,
                  name: response.name,
                  description: response.description
                };
                var users = response.users;
                // Pour chaque utilisateur de la pédale
                users.forEach(function (user) {
                  $http.get(config.apiURL + config.users + user._id)
                    .success(function (response) {
                      user.email = response.email;
                    })
                    .error(function (response) {

                    });
                });
                item.users = users;

                // TODO : Rating
                var rating = response.rating;
                var moy = 0;
                rating.forEach(function (r) {
                  moy += r.rate;
                });
                moy /= rating.length;
                item.rating = moy;

                // TODO Comments

                $scope.user.shared.push(item);
              }).error(function (response) {
            });
          });
        })
        .error(function (response) {

        });


      /**
       * Creation d'une nouvelle pedale
       */
      $scope.newPedal = function () {


        $scope.pedal.owner = $scope.user.id;
        $scope.pedal.user = $scope.user.id;

        pedal.createPedal($scope.pedal).then(function () {
          $location.path('/pedal/'.concat($scope.pedal._id));
        });

      };

      $scope.shareModal = function (pedal) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: '/views/partials/_shareModal.html',
          controller: 'ModalInstanceCtrl',
          resolve: {
            user: function () {
              return $scope.user.id;
            },
            users: function () {
              return $scope.users
            },
            pedal: function () {
              return pedal;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          $scope.selected = selectedItem;
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
      };
      $scope.deletePedal = function (pedal) {
        $http.delete(config.apiURL + config.pedals + pedal._id + "/" + $scope.user.id)
          .success(function (response) {
            $notification.success("Success", "You successfully deleted the pedal.");
            for (var i = 0; i < $scope.user.pedals.length; i++) {
              if ($scope.user.pedals[i]._id == pedal._id) {
                $scope.user.pedals.splice(i, 1);
                break;
              }
            }
          })
          .error(function (response) {
            $notification.error("Error", "An error occured. (" + response.message + ").");
          });
      };
      /**
       retrieve all users
       */
      $http.get(config.apiURL + config.users)
        .then(function (response) {
          $scope.users = response.data;

        });


      $scope.switchToSignup = function () {
        $scope.created = false;
        $scope.logged = true;
      };


      // permet de hash un email
      $scope.hashEmail = function (email) {
        if (email === undefined) {
          return "";
        }
        return md5.createHash(email);
      };


      // votes
      $scope.isReadonly = false;

      $scope.max = 5;
      $scope.rate = 0;

      $scope.hoveringOver = function (value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.max);
      };

    }
  });


angular.module('webClientSideApp')
  .controller('modalShareCtrl', function ($scope, $uibModalInstance, md5, items, pedal) {
    $scope.users = items;
    $scope.pedal = pedal;
    //$http.get("http://localhost:3000/api/users")
    //  .success(function (response) {
    //    response.forEach(function (user) {
    //      $scope.users.push(user);
    //    });
    //  });

    $scope.ok = function () {
      $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    // permet de hash un email
    $scope.hashEmail = function (email) {
      if (email === undefined) {
        return "";
      }
      return md5.createHash(email);
    };
  });


angular.module('webClientSideApp').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, $http, $notification, $location, config, pedal, user, users) {
  $scope.pedal = pedal;
  $scope.users = [];
  $scope.user = user;

  for (var i = 0; i < users.length; i++) {
    if (users[i]._id != $scope.user) {
      $scope.pedal.users.forEach(function (pedalUser) {
        if (users[i]._id == pedalUser._id) {
          users[i].selected = true;
        }
      });
      $scope.users.push(users[i]);
    }
  }

  $scope.save = function () {
    var data = {
      user: $scope.user,
      users: []
    };

    for (var i = 0; i < $scope.users.length; i++) {
      if ($scope.users[i].selected) {
        data.users.push({_id: $scope.users[i]._id})
      }
    }

    $http.put(config.apiURL + config.pedals + $scope.pedal._id + config.pedal_users, data)
      .success(function (response) {
        $notification.success("Congratulations !", "Pedal saved");
        $location.path("/")
      })
      .error(function (response) {
        $notification.error("Error !", "An error occured : " + response.message);
        $uibModalInstance.dismiss();
      });
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.hashEmail = function (email) {
    if (email === undefined) {
      return "";
    }
    return md5.createHash(email);
  };
});
