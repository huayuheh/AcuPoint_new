localStorage.beforePL= 4;





function lazyLoad(url,fn){
  // Create cache if it doesn't exist
  if(!lazyLoad.cache) lazyLoad.cache = [];
  // Load file from cache if it already exists
  if(lazyLoad.cache[url]) {
    // If a function was passed, send the data to it
    if(fn!==undefined) fn(lazyLoad.cache[url]);
  } else {
    // If file doesn't exist in cache, load the file
    $.ajax({url:url})
      .always(function(d){
        console.log("loading:"+url);
      })
      .fail(function(d){
        console.log("failed to load:"+url+" relevant info",d);
      })
      .done(function(d){
        console.log("loaded:"+url);
        // Set the file contents into the local cache
        lazyLoad.cache[url] = d;
        // If a function was passed, call it
        if(fn!==undefined) fn(d);
      });
  }
}
function lazyLoadSVG(data) {
  lazyLoad(data.url,function(d){
    $(data.obj).replaceWith($(d).find("svg").addClass(data.cls));
  });
}


function getSVG(obj) {
  $.ajax({url:obj.data("src")}).done(function(d){
    var doc = $(d).find("svg").removeAttr("style");
    doc.find("circle").remove()
    doc.find("path").removeAttr("style transform");
    var i =$("<i class='icon'>").html(doc);
    obj.replaceWith(i);
  });
}
$("i[data-src]").each(function(){ getSVG($(this)); });

//<i data-src="/img/svg/twitter-icon.svg"></i>





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
      $scope.connectionImg = "img/pen-red.svg"
      $scope.connectionStatus = "Power Off"
    }, 6000);

    socket.on('event:button:state', function( val ) {

    // $scope.powerOn = function() {
      console.log("powerOn");
      $scope.connectionImg = "img/pen-blue.svg";
      $scope.connectionStatus = "Power On";
      $timeout(function () {
        $state.go('tab.treat');
      }, 2000);
      // }
    });
  })


  .controller('HomeCtrl', function($scope) {})

  .controller('DeviceCtrl', function($scope) {})



.controller('ListCtrl', function($scope) {})

.controller('TreatCtrl', function($scope, $ionicActionSheet, $timeout, $window) {

  $scope.showTreatment = function() {
    document.getElementById('body-img').src = "img/body_head.svg";

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
        document.getElementById('body-img').src = "img/body_whole.svg";
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
    $scope.myPain = function( vol ) {
      localStorage.beforePL = vol;
      console.log(localStorage.beforePL);

      $scope.volume = vol;
      $scope.painimage = "img/painlevel_" + $scope.volume  + ".svg";

    };


  })

  .controller('TreatmentlistCtrl', function($scope) {
  })

  .controller('CameraCtrl', function($scope, $timeout, $state) {
    $scope.cameraPoint = "img/point-red.svg";
    $scope.cameraNote = "Untouched !!";
    $scope.cameraNoteColor = { "color" : "#F3807B"};

    $scope.rn = function(min,max){
      var rand = Math.random();
      if(max === void(0)) {
        if(min === void(0)) {
          return rand < 0.5;
        } else {
          return Math.floor(rand * min);
        }
      } else {
        return Math.round((rand * (max - min)) + min);
      }
    }
    $scope.randomLoction = function(){
      var randomNum = $scope.rn(1,10);//Math.ceil((Math.random() * 10));
      if (randomNum > 8) {
        console.log("Touch on");
        $scope.touchRight();
        clearInterval($scope.touchRandom);
      }else {
        console.clear();
        console.log("near by",$scope.cameraPoint);
        $scope.cameraPoint = "img/point-yellow.svg";
        $scope.cameraNote = "Near By !!";
        $scope.cameraNoteColor =
          {
            "color" : "#7E4477",
            "top": "calc(30% + "+$scope.rn(-40,40)+"px)",
            "left": "calc(40% + "+$scope.rn(-40,40)+"px)"
          };

        console.log("near by",$scope.cameraPoint);
      }
    }
    $scope.touchSensorOn = function(){
      $scope.touchRandom = setInterval(function(){ $scope.randomLoction() }, 500);
    }
    $scope.touchRight = function(){
      console.log("Touch on Stasus");
      $scope.cameraPoint = "img/point-blue.svg";
      $scope.cameraNote = "Touched !!";
      $scope.cameraNoteColor = { "color" : "#65A1C8"};
      $timeout(function () {
        $state.go('timer');
      }, 2000);
    }
  })
  .controller('TimerCtrl', function($scope, $timeout, $state) {
    $scope.counter = 120;
    $scope.stopped = false;
    $scope.buttonText='Pause';
    $scope.onTimeout = function(){
      if($scope.counter == 0 ){
        $timeout.cancel(mytimeout);
        $state.go('feedback');
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
    $scope.painimage = "img/painlevel_4.svg";
    $scope.myPain = function( vol ) {
      localStorage.beforePL = vol;
      console.log(localStorage.beforePL);

      $scope.volume = vol;
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
