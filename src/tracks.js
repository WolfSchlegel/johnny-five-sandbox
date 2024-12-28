const five = require('johnny-five');

class Tracks {
  static configs = five.Motor.SHIELD_CONFIGS.ADAFRUIT_V2;

  #leftTrack;
  #rightTrack;
  #speed;

  set speed(speed) {
    this.#speed = speed;
  }

  constructor(speed) {
    this.#leftTrack = new five.Motor(Tracks.configs.M1);
    this.#rightTrack = new five.Motor(Tracks.configs.M2);
    this.#speed = speed;
  }

  moveBack = function () {
    this.#leftTrack.reverse(this.#speed / 2);
    this.#rightTrack.reverse(this.#speed / 2);
  }

  moveForward = function () {
    this.#leftTrack.forward(this.#speed);
    this.#rightTrack.forward(this.#speed);
  }

  moveLeft = function () {
    this.#leftTrack.reverse(this.#speed);
    this.#rightTrack.forward(this.#speed);
  }

  moveRight = function () {
    this.#rightTrack.reverse(this.#speed);
    this.#leftTrack.forward(this.#speed);
  }

  stop = function () {
    this.#leftTrack.stop();
    this.#rightTrack.stop();
  }
}

module.exports = { Tracks }
