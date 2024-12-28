const BLESerialPort = require('ble-serial').SerialPort;
const five = require('johnny-five');
const { Explorer } = require('./explorer.js');

const bleSerial = new BLESerialPort({localName: 'FIRMATA'});
const board = new five.Board({port: bleSerial, repl: true});

board.on("ready", function() {

  const explorer = new Explorer();

  const go = function() {
    explorer.go();
  }
  
  const speed = function(speed) {
    explorer.speed = speed;
  }

  const stop = function() {
    explorer.stop();
  }

  const led = new five.Led(13);

  board.repl.inject({
    explorer, 
    go,
    led,
    speed,
    stop
  });
});


