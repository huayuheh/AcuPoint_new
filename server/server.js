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



process.env.NODE_URL='hanazero.local';

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

        touch.watch(function(err, value) {
            if (value == true){
                console.log('touch off');
                led1.writeSync(0);
                socket.emit('event:touch', true);

            }else{
                console.log('touch on');
                led1.writeSync(1);
                socket.emit('event:touch', false);
            }
        });


        socket.on('event:vibration', function( val ){
            console.log( val );
        });

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
    process.exit();
});
