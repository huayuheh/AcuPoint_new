var gpio = require('onoff').Gpio,
	RaspiCam = require('raspicam'),
	motion = new gpio(21, 'in', 'both');

var camera = new RaspiCam({mode: 'photo', output: Date.now()+'.jpg'});

console.log('turn off the camera');
camera.stop();

motion.watch( function(err, val){
	if( err ) { console.log('Motion in 21 Error'); return; }
	if (val){
		console.log('motion sensor detact something');
		camera.start();
		camera.set('output', Date.now() + '.jpg');
		camera.on('exit', function(){ 
		  console.log('stopped');
		});
	}else{

	}
});


process.on('SIGINT', function(){
  motion.unexport();
  process.exit();
});
