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
    'ngRoute', 'angularAudioRecorder'
  ])
  .config(function ($routeProvider) {
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
      .otherwise({
        templateUrl: '404.html'
      });
  })
  .config(['recorderServiceProvider', function(recorderServiceProvider){
    //configure here
  }]);
