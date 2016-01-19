'use strict';

/**
 * @ngdoc overview
 * @name webClientSideApp
 * @description
 * # webClientSideApp
 *
 * Main module of the application.
 */
angular
  .module('webClientSideApp', [
    'ngRoute',
    'notifications'
  ])
  .config(function ($routeProvider, $compileProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/pedal.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/live', {
        templateUrl: 'views/live.html',
        controller: 'LiveCtrl',
        controllerAs: 'live'
      })
      .when('/signup', {
        templateUrl: 'views/signUp.html',
        controller: 'MainCtrl',
        controllerAs: 'signup'
      })
      .when('/createPedal', {
        templateUrl: 'views/CreatePedal.html',
        controller: 'MainCtrl',
        controllerAs: 'createPedal'
      })
      .otherwise({
        templateUrl: '404.html'
      });

    $compileProvider.debugInfoEnabled(true);
  });
