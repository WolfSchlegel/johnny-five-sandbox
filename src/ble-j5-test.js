/*
 * To run, install the following modules:
 * npm install ble-serial
 * npm install johnny-five
 *
 * wiring:
 * button to pin D2
 * button to pin A2
 * LED to pin D10
 * potentiometer to pin A0
 */

var BLESerialPort = require('ble-serial').SerialPort;
var five = require('johnny-five');

//use the virtual serial port to send a command to a firmata device
var bleSerial = new BLESerialPort({localName: 'FIRMATA'});
var board = new five.Board({port: bleSerial, repl: true});

board.on("ready", function() {
  const led = new five.Led(13);

  const configs = five.Motor.SHIELD_CONFIGS.ADAFRUIT_V2;
  const leftTrack = new five.Motor(configs.M1);
  const rightTrack = new five.Motor(configs.M2);

  board.repl.inject({
    led, 
    leftTrack,
    rightTrack
  });
});
