'use strict';

nx.onload = function () {
  nx.colorize("black", "#FFFFFF");
};

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
    'ngCookies',
    'notifications',
    'ngAnimate',
    'ui.bootstrap',
    'angular-md5'
  ])
  .constant('config',
    {
      apiURL: "http://localhost:3000/",
      samples: "samples/",
      users: "api/users/",
      users_auth: "auth",
      pedals: "api/pedals/",
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
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/pedal/:id', {
        templateUrl: 'views/live.html',
        controller: 'LiveCtrl',
        controllerAs: 'live'
      })
      .when('/create-pedal', {
        templateUrl: 'views/create-pedal.html',
        controller: 'MainCtrl',
        controllerAs: 'createPedal'
      })
      .when('/pedal/:id/design', {
        templateUrl: 'views/pedal-design.html',
        controller: 'PedalDesignCtrl',
        controllerAs: 'pedalDesign'
      })
      .when('/play/:id', {
        templateUrl: 'views/play.html',
        controller: 'PlayCtrl',
        controllerAs: 'play'
      })
      .when('/sign-in', {
        templateUrl: 'views/sign-in.html',
        controller: 'AuthenticationCtrl',
        controllerAs: 'authentication'
      })
      .when('/sign-up', {
        templateUrl: 'views/sign-up.html',
        controller: 'AuthenticationCtrl',
        controllerAs: 'authentication'
      })
      .when('/sign-out', {
        templateUrl: 'views/sign-out.html',
        controller: 'AuthenticationCtrl',
        controllerAs: 'authentication'
      })
      .otherwise({
        templateUrl: '404.html'
      });

    $compileProvider.debugInfoEnabled(true);
  });

