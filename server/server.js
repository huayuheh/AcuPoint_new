var Gpio = require('onoff').Gpio,	//onoff module (use npm install onoff)
    button = new Gpio(18, 'in', 'both'),	//setup GPIO17 as output
    touch = new Gpio(12, 'in', 'both'),
    led1 = new Gpio(20, 'out'),
    led1State = 0,
    level = 0,
    timer = 0;

var RgbChannel = require('rpi-rgb').Channel;
var Colour = require('rpi-rgb').Colour;

var channel1 = new RgbChannel(6,5,4);// BCM 25,24,23


var blue = new Colour(0,100,0);
var white = new Colour(100,100,100);
var black = new Colour(0,0,0);

button.setActiveLow( true );		//optional to reverse button value
touch.setActiveLow( true );

var pattern = [[100,100,100,100], [200,200,200,200], [300,300,300,300]];

function funPattern(i){
    setTimeout(function(){ led.writeSync( 1 ); }, pattern[i][0]);
    setTimeout(function(){ led.writeSync( 0 ); }, pattern[i][1]);
    setTimeout(function(){ led.writeSync( 1 ); }, pattern[i][2]);
    setTimeout(function(){ led.writeSync( 0 ); }, pattern[i][3]);
    console.log('level' + i );
    level = level + 1;
}


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

        //BEGIN LISTENING FOR SOCKET MESSAGES FROM CLIENTS
        //Example:
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

                    socket.emit('event:button', true);
                    console.log("send power signal to phone")

                }
            }else{
                //console.log('Power  is off');
            }
        });



        //socket.on('myCustomMessage', function( val ){ console.log( val ); });

    });

    var state = false;
    setInterval( function(){
        io.sockets.emit('event:led:state', state = !state );
    }, 1000);

    console.log('Server Ready');
});

process.on('SIGINT', function(){
    button.unexport();
    touch.unexport();
    led1.unexport();
    led2.unexport();
    process.exit();
});
