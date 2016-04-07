// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('app', ['ionic','ionic-material', 'ngCordova'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($urlRouterProvider,$stateProvider){
    
    $urlRouterProvider.otherwise('/details');
    
    $stateProvider
    .state('categories',{
        url:'/categories',
        templateUrl: 'templates/categories-list.html',
        controller:'categoriesController',
        controllerAs:'categoriesCtrl'
    })
    .state('propositions',{
        url:'/propositions',
        templateUrl: 'templates/propositions-list.html',
        controller:'propositionsController',
        controllerAs:'propositionsCtrl'
    })
    .state('details',{
        url:'/details',
        templateUrl: 'templates/details.html',
        controller:'detailsController',
        controllerAs:'detailsCtrl'
    });
    
})

.service('APIParisToken', function(){
  this.token = "9374c2e664f094392c08daf3355c48e647b3653a9cb88cb97becb20a14838028";
});
