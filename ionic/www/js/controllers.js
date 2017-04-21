


angular.module('starter.controllers', [])

  .controller('SignInCtrl', function($scope, $state) {

    $scope.signIn = function(user) {
      console.log('Sign-In', user);
      $state.go('tab.home');
    };

  })


  .controller('HomeCtrl', function($scope) {})

  .controller('DeviceCtrl', function($scope) {})
// .controller('HomeCtrl',  ['$rootScope', '$scope', '$window',
//   function($rootScope, $scope, $window) {
//
//     $scope.login = function() {
//       $window.location.assign('#/device');
//     };
//   }])


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
    $scope.$watch('data1.volume', function(val) {
      console.log('data1.volume: '+ val);
    });
  })

  .controller('TreatmentlistCtrl', function($scope) {
  })

  .controller('TimerCtrl', function($scope) {
  })

  .controller('CameraCtrl', function($scope) {

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
