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
    'notifications',
    'ngAnimate',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider, $compileProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/pedal', {
        templateUrl: 'views/pedal.html',
        controller: 'AboutCtrl',
        controllerAs: 'pedal'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'MainCtrl',
        controllerAs: 'about'
      })
      .when('/live/:id', {
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
