var Gpio = require('onoff').Gpio,
  motion = new Gpio(21, 'in', 'both'),
  buzzer = new Gpio(16, 'out'),
  buzzerState = 0;

  buzzer.writeSync(0);

  motion.watch( function(err, val){
  
  if( err ) { console.log('Motion in 21 Error'); return; }
  if (val == 1){console.log(val); buzzer.writeSync(1); }
  else{buzzer.writeSync(0);}
  });


function exit() {
  buzzer.unexport();
  motion.unexport();
  process.exit();
}
 
process.on('SIGINT', exit);