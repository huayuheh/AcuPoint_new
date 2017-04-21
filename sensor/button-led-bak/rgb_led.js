var RgbChannel = require('rpi-rgb').Channel;
var Colour = require('rpi-rgb').Colour;

var channel1 = new RgbChannel(6,5,4);

var red = new Colour(100,0,0);
var softRed = new Colour(10,0,0);
var blue = new Colour(0,100,0);
var white = new Colour(100,100,100);
var yellow = new Colour(100,100,0);

// Start by fading to blue.
channel1.fadeRgb(blue, 2000, function() {
    // When that's done, strobe.
    channel1.strobeRgb(white, 18, 1000, function() {
        // After strobing, fade to yellow.
        channel1.fadeRgb(yellow, 700);
    });
});

// After the timeout, all the above is likely done, so start pulsing red.
setTimeout(function(thisobj) { thisobj.pulseRgb(softRed, red, 800, 1500); }, 7000, channel1);