var socket = io();
var showTime = new Date();
socket.on('event:hello', function(){
  console.log('Hello from server through socket');
});

var app = angular.module('feeder', [ ]);
  app.controller('CamaraController', function($scope){
      $scope.captureNote = "No motion";
      $scope.captureTime = showTime;
      $scope.captureImage = "/assets/img/logo-color-s.jpg";

      socket.on('event:photo', function( photoTime ) {
          console.log("receive data "+ photoTime);
          setTimeout(function(){
              $scope.$apply( function() {
                $scope.captureNote = "Detacted a motion";
                showTime = new Date(photoTime);
                $scope.captureTime = showTime;
                $scope.captureImage ="/assets/img/" + photoTime + ".jpg";
              });
          },500);
      });
      $scope.buzzer = function(){
          console.log("Buzzer");
          socket.emit('event:buzzer', true);
      };
      $scope.video = function(){
          console.log("video");
          socket.emit('event:video', true);
      };
      $scope.identify = function(){
          console.log("identify");
      };
      $scope.light = function(){
          console.log("Turn on/off");
          socket.emit('event:light', true);
      };
  });


