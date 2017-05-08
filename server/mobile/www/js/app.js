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
    .state('tab.alert', {
      url: '/alert',
      views: {
        'tab-home': {
          templateUrl: 'templates/alert.html',
          controller: 'AlertCtrl'
        }
      }
    })

  .state('tab.device', {
    url: '/device',
    views: {
      'tab-device': {
        templateUrl: 'templates/tab-device.html',
        controller: 'DeviceCtrl'
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
    .state('tab.record-detail', {
      url: '/record/:recordId',
      views: {
        'tab-record': {
          templateUrl: 'templates/record-detail.html',
          controller: 'RecordDetailCtrl'
        }
      }
    })
  .state('tab.dictionary', {
    url: '/dictionary',
    views: {
      'tab-dictionary': {
        templateUrl: 'templates/tab-dictionary.html',
        controller: 'DictionaryCtrl'
      }
    }
  })
    .state('tab.dictionary-detail', {
      url: '/dictionary/:chatId',
      views: {
        'tab-dictionary': {
          templateUrl: 'templates/dictionary-detail.html',
          controller: 'DictionaryDetailCtrl'
        }
      }
    })

    .state('tab.setting', {
      url: '/setting',
      views: {
        'tab-setting': {
          templateUrl: 'templates/tab-setting.html',
          controller: 'SettingCtrl'
        }
      }
    })

      .state('tab.setting-alert', {
        url: '/setting-alert',
        views: {
          'tab-setting': {
            templateUrl: 'templates/setting-alert.html',
            controller: 'AlertDetailCtrl'
          }
        }
      })




  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});
