var Gpio = require('onoff').Gpio,	//onoff module (use npm install onoff)
  button = new Gpio(17, 'in', 'both'),	//setup GPIO17 as output
  led = new Gpio(27, 'out'),      //setup GPIO27 as output
  times = 0,
  ledState = 0; 		  //internal variable to track LED state (1 = on, 0 = off)


var pattern = [[200,250,450,500], [100,150,250,300], [50,100,150,200]];

function funPattern(i){
  setTimeout(function(){ led.writeSync( 1 ); }, pattern[i][0]);
  setTimeout(function(){ led.writeSync( 0 ); }, pattern[i][1]);
  setTimeout(function(){ led.writeSync( 1 ); }, pattern[i][2]);
  setTimeout(function(){ led.writeSync( 0 ); }, pattern[i][3]);
  times = times +1;
}


button.setActiveLow( true );		//optional to reverse button value

button.watch(function(err, value) {	//watch button changes
	if (value == true){

		funPattern(times%3);
		console.log('Button is ON ' + times%3 );
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

