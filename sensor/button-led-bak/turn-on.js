
var Gpio = require('onoff').Gpio,	//onoff module (use npm install onoff)
  button = new Gpio(18, 'in', 'both'),	//setup GPIO17 as output
  led = new Gpio(4, 'out'),      //setup GPIO27 as output
  ledState = 0, 		  //internal variable to track LED state (1 = on, 0 = off)
  timer = 0;

button.setActiveLow( true );		//optional to reverse button value

button.watch(function(err, value) {	//watch button changes
	if (value == true){
		timer = timer +1 ;
        console.log('timer:'+ timer);
	}else{
	//	led.writeSync( 0 );
	//	console.log('Button is OFF');
	}
    if ( timer % 2 == 0 ){
        led.writeSync( 0 );
	}else{
        led.writeSync( 1 );
	}




});

process.on('SIGINT', function(){
  button.unexport();
  led.unexport();
  process.exit();
});







