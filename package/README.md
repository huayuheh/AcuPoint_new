# WNM499: Midterm
## Title: Birfeeder
### ![Logo](https://raw.githubusercontent.com/JesusGuerrero/hana-iot/master/midterm/images/birfeeder-logo.jpg?token=APcrcs3DpBCOOEf_B82Jj9r5QfGoJECNks5YEvMywA%3D%3D)
## Problem
When I was a kid, my parents took me to the woods and the beach to watch wild birds on the weekends. I enjoyed using telescopes to observe colorful birds, the most beautiful and adorable creatures in the world. Unfortunately, bird watching takes a lot of time to wait and search for birds, so not many people have the patience to enjoy this. The bird feeder is an easy and straightforward way for people to watch birds and enjoy this activity. But the traditional bird feeder has some issues that might detract from the beginner’s enthusiasm such as other animals stealing seeds, and a long wait time without any reward. You could miss rare birds during regular work hours.
## Solution
![function](https://raw.githubusercontent.com/JesusGuerrero/hana-iot/master/midterm/images/birfeeder-function.jpeg?token=APcrcllzMZpD3Jr3HIidxweejTfdOOtTks5YEvL_wA%3D%3D)
BirdFeeder can solve that problem for beginners and let them dive into the world of birds effortlessly because of the motion sensor, the camera, and buzzer. The motion sensor can detect the live creature near the feeder, and the camera will take a picture and send the picture to the client’s phone. As a result, the owner can see the photo then decide to expel squirrels and other rodents by buzzer or watch the birds in person. Even if the proprietor is not nearby, he can choose to record the video for later watching so that he will never miss the moment that birds visit his BirdFeeder.
### High-level System Design
![Feeder to App](https://raw.githubusercontent.com/JesusGuerrero/hana-iot/master/midterm/images/birfeeder-system1.jpeg?token=APcrcr0hGBVhSvvNCi5Y4BlLKgTeQkmBks5YEvNtwA%3D%3D)
For real birfeeder product, when the PIR sensor detects action, the system takes a picture and sends the photo to the web server (Heroku or firebase) through the private network to the public network. Then the web server sends the notification with the picture to the user’s application through the public network using wifi or 4G so that user can receive the alarm outside of the home.
![App to Feeder](https://raw.githubusercontent.com/JesusGuerrero/hana-iot/master/midterm/images/birfeeder-system2.jpeg?token=APcrcm3PWwQNPWXGN9tWSx1DS4O8TVDpks5YEvOSwA%3D%3D)
After the user sees the picture, the user can decide to turn on the buzzer to expel the unwelcome animals or take a video of this bird. When the user presses the button, the application will send the signal back to the Raspberry Pi inside of the BirdFeeder through the cloud server. Then the Raspberry Pi controls the buzzer or camera for the request of video or buzzer.
Right now, I'm not sure about my coding ability to use Heroku service to build the online server, so for the prototype, I will try only to use the private network for testing. If I had more time and ability, I would try to build the node server on Heroku.
## Prototype
![Prototype](https://raw.githubusercontent.com/JesusGuerrero/hana-iot/master/midterm/images/birfeeder-prototype.jpg?token=APcrcj5exRmu6f8ojoAWWUAjo8dOkCwlks5YEvNQwA%3D%3D)
The prototype above will consist of getting the system setup with camera, buzzer, motion sensor, and two LED light.
## Development
### Provisioning
The RaspberryPi is a mini-computer which needs to be provisioned. Here are the steps:
- Using a personal laptop download NOOBS
- Extract the contents into a micro-sd card at least 8Gb
- Open recovery.cmdline and add silentinstall at the end
- Put micro-sd card into Pi, turn on, and wait 30 minutes
- With laptop connected to wireless internet, chose to share internet via ethernet port
- Connect your laptop computer's ethernet into the Pi's ethernet
- SSH into the Pi with your laptop's terminal. ssh pi@192.168.2.2 (if that doesn't work try arp -a to find the Pi's IP address)
- Using the terminal to control the Pi, download the remote desktop tool. sudo apt-get install tightvncserver
- Start VNCServer by typing vncserver. The first time you launch it will ask you to create a password.
- On your laptop, download VNC Viewer and use the following address to login. 192.168.2.2:1
- Using the Raspbian Desktop, open up the terminal, then install and configure the following:
	- git
	- node
	- vim

### Integrating
The Raspberry Pi will be programmed as a web socket server. The server will run on it's assigned IP address when connected to the wireless router. The Pi will receive commands from a mobile client via web sockets. 
The Ionic mobile app will be connected to the same wireless router network as the Raspberry Pi. The mobile will use the Raspberry Pi's IP address to connect via web socket. The mobile app will control the camera and the buzzer.

### Code Snippets
#### Motion Sensor
``` javascript
var gpio = require('onoff').Gpio
  , motion = new gpio(21, 'in', 'both');

motion.watch( function(err, val){
  if( err ) { console.log('Motion in 21 Error'); return; }

  console.log('Motion in 21 is ' + (val ? 'ACTIVE' : 'INACTIVE') +': ' + new Date().toLocaleString() );

});

process.on('SIGINT', function(){
  motion.unexport();
  process.exit();
});
```
Test the motion sensor connecting to the raspberry Pi correctly. And when the sensor detects motion it sends the signal back to the Pi.

#### Motion Sensor with camera
``` javascript
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
```
This piece of code improves the motion.js to use the motion sensor controlling camera to take a picture at the moment of detection. The image is saved based on the current time.

#### Buzzer with sensor
``` javascript
 buzzer.writeSync(0);

  motion.watch( function(err, val){
  console.log(val);
  if( err ) { console.log('Motion in 21 Error'); return; }

  buzzer.writeSync(val);
});
```
This piece of code improves the motion.js to use the motion sensor to turn on the buzzer.

#### LED Light
``` javascript
var Gpio = require('onoff').Gpio, //onoff module (use npm install onoff)
  led1 = new Gpio(27, 'out'),
  led2 = new Gpio(22, 'out'),     //setup GPIO27 as output
  ledState = 0; 		  //internal variable to track LED state (1 = on, 0 = off)

setInterval( function(){	  //setInterval repeats a function every fixed preset milliseconds
  led1.writeSync( ledState );
  led2.writeSync( ledState );
  ledState = ledState ? 0 : 1;    //update next ledState, if 1 then 0 else if 0 then 1
}, 100);			  //setInterval fixed preset milliseconds

process.on('SIGINT', function(){  //exit properly
  led1.unexport();
  led2.unexport();
  process.exit();
});
```
Sometimes the inside of the feeder is dark, so the user wants to turn on the light for better photography. In this piece of code, two LEDs are controled by raspberry Pi to make a light pattern.




