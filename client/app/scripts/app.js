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
    'ui.bootstrap',
    'angular-md5'
    //,'angular-cookies'
  ])
  .constant('config',
    {
      apiURL: "http://localhost:3000/api/",
      users: "users/",
      pedals: "pedals",
      pedal_comments: "/comments",
      pedal_rates: "/rates",
      pedal_design: "/design"
    }
  )
  .config(function ($routeProvider, $compileProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/main_old', {
        templateUrl: 'views/main_old.html',
        controller: 'MainOld',
        controllerAs: 'mainold'
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
      .when('/pedal/:id', {
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
      .when('/pedal/:id/design', {
        templateUrl: 'views/pedal-design.html',
        controller: 'PedalDesignCtrl',
        controllerAs: 'pedalDesign'
      })
      .otherwise({
        templateUrl: '404.html'
      });

    $compileProvider.debugInfoEnabled(true);
  });

nx.onload = function() {
  nx.colorize("black", "#FFFFFF");
}	;

