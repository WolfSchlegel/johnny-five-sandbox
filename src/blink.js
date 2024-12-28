const BLESerialPort = require('ble-serial').SerialPort;
const five = require("johnny-five");

// const board = new five.Board({port: "/dev/tty.usbmodem1101"});

var bleSerial = new BLESerialPort({localName: 'FIRMATA'});
var board = new five.Board({port: bleSerial, repl: true});

board.on("ready",() => {
    const led = new five.Led(13);

    const configs = five.Motor.SHIELD_CONFIGS.ADAFRUIT_V2;
    const motor = new five.Motor(configs.M1);

    board.repl.inject({
      led, 
      motor
    });
});
