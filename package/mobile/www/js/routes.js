angular.module('app.routes', ['ionicUIRouter'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.whoIsComing', {
    url: '/alart',
    views: {
      'tab5': {
        templateUrl: 'templates/whoIsComing.html',
        controller: 'whoIsComingCtrl'
      }
    }
  })

  .state('tabsController.live', {
    url: '/live',
    views: {
      'tab4': {
        templateUrl: 'templates/live.html',
        controller: 'liveCtrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.report'
      2) Using $state.go programatically:
        $state.go('tabsController.report');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab2/report
      /page1/tab3/report
  */
  .state('tabsController.report', {
    url: '/report',
    views: {
      'tab2': {
        templateUrl: 'templates/report.html',
        controller: 'reportCtrl'
      },
      'tab3': {
        templateUrl: 'templates/report.html',
        controller: 'reportCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('tabsController.peeper', {
    url: '/home',
    views: {
      'tab1': {
        templateUrl: 'templates/peeper.html',
        controller: 'peeperCtrl'
      }
    }
  })

  .state('setting', {
    url: '/setting',
    templateUrl: 'templates/setting.html',
    controller: 'settingCtrl'
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.chickadee'
      2) Using $state.go programatically:
        $state.go('tabsController.chickadee');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab2/report1
      /page1/tab3/report1
  */
  .state('tabsController.chickadee', {
    url: '/report1',
    views: {
      'tab2': {
        templateUrl: 'templates/chickadee.html',
        controller: 'chickadeeCtrl'
      },
      'tab3': {
        templateUrl: 'templates/chickadee.html',
        controller: 'chickadeeCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/page1/alart')

  

});