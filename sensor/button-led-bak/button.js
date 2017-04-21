var Gpio = require('onoff').Gpio,	//onoff module (use npm install onoff)
  button = new Gpio(16, 'in', 'both');	//setup GPIO17 as output

button.setActiveLow( true );		//optional to reverse button value

button.watch(function(err, value) {	//watch button changes
  console.log('Button is ' + (value ? 'ON' : 'OFF'));
});

process.on('SIGINT', function(){
  button.unexport();
  process.exit();
});