// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('signin', {
      url: '/sign-in',
      templateUrl: 'templates/sign-in.html',
      controller: 'SignInCtrl'
    })

    .state('device', {
      url: '/device',
      templateUrl: 'templates/device.html',
      controller: 'DeviceCtrl'
    })

    .state('baseline', {
      url: '/baseline',
      templateUrl: 'templates/baseline.html',
      controller: 'BaselineCtrl'
    })

    .state('treatmentlist', {
      url: '/treatmentlist',
      templateUrl: 'templates/treatmentlist.html',
      controller: 'TreatmentlistCtrl'
    })


  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:



  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('tab.list', {
    url: '/list',
    views: {
      'tab-list': {
        templateUrl: 'templates/tab-list.html',
        controller: 'ListCtrl'
      }
    }
  })

  .state('tab.treat', {
      url: '/treat',
      views: {
        'tab-treat': {
          templateUrl: 'templates/tab-treat.html',
          controller: 'TreatCtrl'
        }
      }
    })

    .state('tab.baseline', {
      url: '/baseline',
      views: {
        'baseline': {
          templateUrl: 'templates/baseline.html',
          controller: 'BaselineCtrl'
        }
      }
    })

  .state('tab.record', {
    url: '/record',
    views: {
      'tab-record': {
        templateUrl: 'templates/tab-record.html',
        controller: 'RecordCtrl'
      }
    }
  })

  .state('tab.profile', {
    url: '/profile',
    views: {
      'tab-profile': {
        templateUrl: 'templates/tab-profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })
  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/sign-in');

});
