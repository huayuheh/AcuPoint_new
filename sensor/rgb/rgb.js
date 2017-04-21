var five = require("johnny-five");
var Raspi = require("raspi-io");
var board = new five.Board({
    io: new Raspi()
});

board.on("ready", function() {
    var led = new five.Led.RGB({
        pins: {
            red: 25,
            green: 24,
            blue: 23
        }
    });

    // RGB LED alternate constructor
    // This will normalize an array of pins in [r, g, b]
    // order to an object (like above) that's shaped like:
    // {
    //   red: r,
    //   green: g,
    //   blue: b
    // }
    //var led = new five.Led.RGB([3,5,6]);

    // Add led to REPL (optional)
    this.repl.inject({
        led: led
    });

    // Turn it on and set the initial color
    led.on();
    led.color("#FF0000");

    led.blink(1000);
});