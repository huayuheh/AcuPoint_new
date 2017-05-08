var gpio = require('onoff').Gpio,
    RaspiCam = require('raspicam'),
    led1 = new gpio(27, 'out'),
    led2 = new gpio(22, 'out'),
    buzzer = new gpio(12, 'out');

var ledState = 0;

process.env.NODE_URL='10.0.1.30';

require('mahrio').runServer( process.env, __dirname ).then( function( server ) {

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: ['../public/']
      }
    }
  });

  var io = require('socket.io').listen( server.listener );



  io.on('connection', function( socket ) {
    console.log('connection: ', socket.id );
    socket.emit('event:hello');

      //LED
      socket.on('event:light', function () {
          console.log("turn on light ");
          ledState = ledState + 1;
          led1.writeSync(ledState%2);
          led2.writeSync(ledState%2);
      });

      //Buzzer
      socket.on('event:buzzer', function () {
          buzzer.writeSync(1);
          console.log("turn on buzzer ");
          setTimeout(function () {
              buzzer.writeSync(0);
          }, 3000);
      });

  
    //BEGIN LISTENING FOR SOCKET MESSAGES FROM CLIENTS
    //Example:
    //socket.on('myCustomMessage', function( val ){ console.log( val ); });

  });


  var state = false;
  setInterval( function(){
    io.sockets.emit('event:led:state', state = !state );
  }, 1000);

  console.log('Server Ready');
});
