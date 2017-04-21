var gpio = require('onoff').Gpio
  , motion = new gpio(21, 'in', 'both');

var isRec = false;
 
motion.watch(function(err, value) {
  if (err) exit();

  console.log('Intruder detected..');
  if (value == 1 && !isRec) {
 
    console.log('capturing video.. ');
 
    isRec = true;
 
    var exec = require('child_process').exec;
    var video_path = './video' + Date.now() + '.jpg';
 
    var cmd = 'raspistill -o ' + video_path ;

    exec(cmd, function(error, stdout, stderr) {
      // output is in stdout
      console.log('Video Saved @ : ', video_path);
      //require('./mailer').sendEmail(video_path);
 
      isRec = false;
    });
 
  }
});

process.on('SIGINT', function(){
  motion.unexport();
  process.exit();
});