angular.module('app')
    .config(function($urlRouterProvider,$stateProvider){
    
    $stateProvider
    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'views/menu.html',
        controller: 'AppCtrl'
    })
    .state('app.categories', {
        url: '/categories',
        views: {
            'menuContent': {
                templateUrl: 'views/categories.html'
            }
        }
    })
    .state('app.categories.categorie', {
        url: '/categorie/:categorieId',
        views: {
          'menuContent': {
            templateUrl: 'views/categorie.html'
          }
        }
    })
    .state('app.categories.categorie.single', {
        url: '/single/:categorieId&singleId',
        views: {
          'menuContent': {
            templateUrl: 'views/single.html'
          }
        }
    });
    
})