
var Gpio = require('onoff').Gpio,	//onoff module (use npm install onoff)
    button = new Gpio(18, 'in', 'both'),	//setup GPIO17 as output
    touch = new Gpio(16, 'in', 'both'),
    buttonup = new Gpio(20, 'in', 'both'),
    led = new Gpio(21, 'out'),      //setup GPIO27 as output
    ledState = 0, 		  //internal variable to track LED state (1 = on, 0 = off)
    timer = 0,
    level = 0;

var RgbChannel = require('rpi-rgb').Channel;
var Colour = require('rpi-rgb').Colour;

var channel1 = new RgbChannel(6,5,4);// BCM 25,24,23


var blue = new Colour(0,100,0);
var white = new Colour(100,100,100);
var black = new Colour(0,0,0);

button.setActiveLow( true );		//optional to reverse button value
touch.setActiveLow( true );
buttonup.setActiveLow( true );

var pattern = [[100,100,100,100], [200,200,200,200], [300,300,300,300]];

function funPattern(i){
    setTimeout(function(){ led.writeSync( 1 ); }, pattern[i][0]);
    setTimeout(function(){ led.writeSync( 0 ); }, pattern[i][1]);
    setTimeout(function(){ led.writeSync( 1 ); }, pattern[i][2]);
    setTimeout(function(){ led.writeSync( 0 ); }, pattern[i][3]);
    console.log('level' + i );
    level = level + 1;
}



button.watch(function(err, value) {	//watch button changes
    if (value == true){

        timer = timer + 1 ;
        console.log('timer:'+ timer);

        if ( timer % 2 == 0 ){
            console.log('Power  is off');
            channel1.fadeRgb(black,500);

        }else{
            console.log('Power  is on');
            channel1.strobeRgb(white, 100, 1500);

            channel1.fadeRgb(blue,500);

            touch.watch(function(err, value) {
                if (value == true){
                    console.log('Touch is off');
                    led.writeSync( 0 );
                }else{
                    console.log('Touch is on' );
                    funPattern(level%3);

                    buttonup.watch(function(err, value) {
                        if (value == true){

                            funPattern(level%3);
                        }else{
                            led.writeSync( 0 );
                            console.log('Button is OFF');
                        }
                    });

                }
            });
	    }
    }else{
        //console.log('Power  is off');
    }
});

process.on('SIGINT', function(){
  button.unexport();
  led.unexport();
  process.exit();
});



// Start by fading to blue.
//channel1.fadeRgb(blue, 2000, function() {
//console.log("RGB LED");
    // When that's done, strobe.
   // channel1.strobeRgb(white, 18, 1000, function() {
        // After strobing, fade to yellow.
      //  channel1.fadeRgb(yellow, 700);
   // });
//});

// After the timeout, all the above is likely done, so start pulsing red.
//setTimeout(function(thisobj) { thisobj.pulseRgb(softRed, red, 800, 1500); }, 7000, channel1);