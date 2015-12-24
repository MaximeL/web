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
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/liveinput', {
        templateUrl: 'views/liveinput.html',
        controller: 'LiveInputCtrl',
        controllerAs: 'liveInput'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
