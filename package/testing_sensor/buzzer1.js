var Gpio = require('onoff').Gpio,
  buzzer = new Gpio(16, 'out'),
  buzzerState = 0;

  setInterval(function(){
  buzzer.writeSync(buzzerState);
  if (buzzerState){buzzerState =0;} else {buzzerState =1;} 
  },1000);

function exit() {
  buzzer.unexport();
  process.exit();
}
 
process.on('SIGINT', exit);