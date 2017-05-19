localStorage.beforePL= 4;
localStorage.AfterPL= 4;
var painDescriptionArray = ["0-No Pain", "1-Very Mind", "2-Discomforting","3-Tolerable","4-Distressing","5-Very Distressing", "6-Intense Pain","7-Very Intense Pain", "8-Horrible Pain"];


angular.module('starter.controllers', [])
  .controller('OnboardingCtrl', function($scope,$timeout, $state){
    $timeout(function () {
      $state.go('signin');
    }, 3000);

  })
  .controller('SignUpCtrl', function($scope, $state){
    $scope.signIn = function(user) {
      console.log('Sign-In', user);
      $state.go('connection');
    };
  })

  .controller('SignInCtrl', function($scope, $state) {

    $scope.signIn = function(user) {
      console.log('Sign-In', user);
      $state.go('connection');
    };

  })
  .controller('ConnectionCtrl', function($scope, $timeout,$state) {
    $scope.connectionNote = "Turn on the Bluetooth to connect your AcuPoint Pen";
    $scope.connectionImg = "img/bluetooth-red.svg"
    $scope.connectionStatus = "Bluetooth Off"

    $timeout(function () {
      $scope.connectionImg = "img/bluetooth-blue.svg"
      $scope.connectionStatus = "Bluetooth ON"
    }, 4000);

    $timeout(function () {
      $scope.connectionNote = "Turn on AcuPoint Pen's power for connecting to your phone";
      $scope.connectionImg = "img/pen-red.svg";
      $scope.connectionStatus = "Power Off";
    }, 6000);

    socket.on('event:button', function() {

      // $scope.powerOn = function() {
      console.log("powerOn");
      $timeout(function () {
        $scope.connectionImg = "img/pen-blue.svg";
        $scope.connectionStatus = "Power On";
      }, 2000);

      $timeout(function () {
        $state.go('tab.treat');
      }, 4000);
      // }
    });
    $scope.powerOn = function() {
      $state.go('tab.treat');
    }
  })


  .controller('HomeCtrl', function() {
    // document.getElementsByClassName('bar').style.height = "128px";
  })

  .controller('DeviceCtrl', function($scope) {})



  .controller('ListCtrl', function($scope) {})

  .controller('TreatCtrl', function($scope, $ionicActionSheet, $timeout, $window) {

    $scope.showTreatment = function($scope, $element) {
      document.getElementById('body-img').src = "img/woman-front-head.svg";

      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          { text: 'Cold' },
          { text: 'Dry eyes' },
          { text: 'Headache' },
          { text: 'Toothache' }
        ],
        // destructiveText: 'Delete',
        titleText: '<i class="icon ion-faceicon"></i> Pain Around Head Area',
        cancelText: 'Cancel',
        cancel: function() {
          // add cancel code..
          document.getElementById('body-img').src = "img/woman-front.svg";
        },
        buttonClicked: function(index) {
          $window.location.assign('#/baseline');
        }
      });

      // For example's sake, hide the sheet after two seconds
      // $timeout(function() {
      //   hideSheet();
      // }, 2000);

    };

  })
  .controller('BaselineCtrl', function($scope) {

    $scope.volume = 4;
    $scope.min = 0;
    $scope.max = 8;
    $scope.painimage = "img/painlevel_4.svg";
    $scope.painDescription = painDescriptionArray[4];
    $scope.myPain = function( vol ) {
      localStorage.beforePL = vol;
      console.log(localStorage.beforePL);

      $scope.volume = vol;
      $scope.painDescription = painDescriptionArray[vol];
      $scope.painimage = "img/painlevel_" + $scope.volume  + ".svg";

    };


  })

  .controller('TreatmentlistCtrl', function($scope) {
  })

  .controller('CameraCtrl', function($scope, $timeout, $state) {
    $scope.cameraPoint = "img/point-red.svg";
    $scope.cameraNote = "Untouched !!";
    $scope.cameraNoteColor = { "color" : "#F3807B"};


    socket.on('event:touch', function() {

      // $scope.powerOn = function() {
      console.log("powerOn");
      $timeout(function () {
        $scope.cameraPoint = "img/point-yellow.svg";
        $scope.cameraNote = "Near By !!";
        $scope.cameraNoteColor = { "color" : "#7E4477"};
      }, 2000);

      $timeout(function () {
        $scope.cameraPoint = "img/point-blue.svg";
        $scope.cameraNote = "Touched !!";
        $scope.cameraNoteColor = { "color" : "#65A1C8"};
      }, 4000);

      $timeout(function () {
        $state.go('timer');
      }, 6000);
      // }
    });

    $scope.touchSensorOn = function(){
      $timeout(function () {
        $scope.cameraPoint = "img/point-yellow.svg";
        $scope.cameraNote = "Near By !!";
        $scope.cameraNoteColor = { "color" : "#7E4477"};
      }, 2000);

      $timeout(function () {
        $scope.cameraPoint = "img/point-blue.svg";
        $scope.cameraNote = "Touched !!";
        $scope.cameraNoteColor = { "color" : "#65A1C8"};
      }, 4000);

      $timeout(function () {
        $state.go('timer');
      }, 6000);
      }
  })

  .controller('TimerCtrl', function($scope, $timeout, $state) {
    $scope.counter = 120;
    $scope.stopped = false;
    $scope.buttonText='Pause';
    $scope.onTimeout = function(){
      if($scope.counter == 0 ){
        $timeout.cancel(mytimeout);
        // $state.go('feedback');
      }else{
        $scope.counter--;
      }
      mytimeout = $timeout($scope.onTimeout,1000);
    }

    var mytimeout = $timeout($scope.onTimeout,1000);
    $scope.pause = function(){
      if(!$scope.stopped){
        $timeout.cancel(mytimeout);
        $scope.buttonText='play';
      }
      else
      {
        mytimeout = $timeout($scope.onTimeout,1000);
        $scope.buttonText='Stop';
      }
      $scope.stopped=!$scope.stopped;
    }
    $scope.next = function(){
      $state.go('feedback');
    }

    $scope.volume = 4;
    $scope.min = 0;
    $scope.max = 8;
    $scope.myVibration = function( vol ) {

      console.log(vol);

      $scope.volume = vol;


    };



  })
  .filter('formatTimer', function() {
    return function(input)
    {
      function z(n) {return (n<10? '0' : '') + n;}
      var seconds = input % 60;
      var minutes = Math.floor(input / 60);
      return (z(minutes)+':'+z(seconds));
    };
  })

  .controller('FeedbackCtrl', function($scope) {
    $scope.volume = 4;
    $scope.min = 0;
    $scope.max = 8;
    $scope.baseline = "Baseline: " + localStorage.beforePL;
    $scope.painimage = "img/painlevel_4.svg";

    $scope.painDescription = painDescriptionArray[4];
    $scope.myPain = function( vol ) {
      localStorage.beforePL = vol;
      console.log(localStorage.beforePL);

      $scope.volume = vol;
      $scope.painDescription = painDescriptionArray[vol];
      $scope.painimage = "img/painlevel_" + $scope.volume  + ".svg";

    };


  })

  .controller('EndingCtrl', function($scope) {


  })

  .controller('RecordCtrl', function($scope) {})
  .controller('ProfileCtrl', function($scope) {})
  .controller('DeviceCtrl', function($scope) {})








  .controller('DashCtrl', function($scope) {})

  .controller('ChatsCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
