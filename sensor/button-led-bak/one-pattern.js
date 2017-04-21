var Gpio = require('onoff').Gpio,	//onoff module (use npm install onoff)
  button = new Gpio(17, 'in', 'both'),	//setup GPIO17 as output
  led = new Gpio(27, 'out'),      //setup GPIO27 as output
  ledState = 0; 		  //internal variable to track LED state (1 = on, 0 = off)



button.setActiveLow( true );		//optional to reverse button value

button.watch(function(err, value) {	//watch button changes
	if (value == true){
		setTimeout(function(){ led.writeSync( 1 ); }, 200);
   		setTimeout(function(){ led.writeSync( 0 ); }, 300);
    	setTimeout(function(){ led.writeSync( 1 ); }, 500);
    	setTimeout(function(){ led.writeSync( 0 ); }, 600);
		console.log('Button is ON' );
	}else{
		led.writeSync( 0 );
		console.log('Button is OFF');
	}
});

process.on('SIGINT', function(){
  button.unexport();
  led.unexport();
  process.exit();
});


