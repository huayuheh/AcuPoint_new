var Gpio = require('onoff').Gpio, //onoff module (use npm install onoff)
  button = new Gpio(17, 'in', 'both'),  //setup GPIO17 as output
  led = new Gpio(27, 'out'),      //setup GPIO27 as output
  ledState = 1;       //internal variable to track LED state (1 = on, 0 = off)

var iv = setInterval(function(){
  led.writeSync(led.readSync() === 0 ? 1 : 0)
}, 3000);

button.setActiveLow( true );    //optional to reverse button value



button.watch(function(err, value) { //watch button changes
  if (value == true){
    console.log('Button is ON' );
  }else{
    setTimeout(function() {
        clearInterval(iv); // Stop blinking
        led.writeSync(0);  // Turn LED off.
      }, 1);
    console.log('Button is OFF');
  }
});

process.on('SIGINT', function(){
  button.unexport();
  led.unexport();
  process.exit();
});
