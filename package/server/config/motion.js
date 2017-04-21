 var gpio = require('onoff').Gpio,
  RaspiCam = require('raspicam'),
  motion = new gpio(21, 'in', 'both'),
  buzzer = new gpio(16, 'out'),
  io = null;
  var photoTime = Date.now();
var camera = new RaspiCam({mode: 'photo', output: './server/public/img/' + photoTime +'.jpg'});

motion.watch( function(err, val){
  if( err ) { console.log('Motion in 21 Error'); return; }
  if (val){
    console.log('motion sensor detact something');
    
    camera.set('output', './server/public/img/' + photoTime + '.jpg');	
    camera.start();
    camera.on("read",function(){
    console.log("reading");
   	 if( io ) {
  	    io.sockets.emit('event:photo', photoTime);
		console.log('send data to server' + photoTime );

 	   }
    });
	camera.on("exit", function(){
console.log("exited");
photoTime = Date.now();
	});
  }
});

process.on('SIGINT', function(){
  motion.unexport();
  buzzer.unexport();
  process.exit();
});

module.exports = function( ioInstance ) {
  io = ioInstance;
}
