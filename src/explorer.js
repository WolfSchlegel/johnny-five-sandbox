const { Direction } = require('./constants.js');
const { TrackingSensors } = require('./tracking-sensors.js');
const { Tracks } = require('./tracks.js');

class Explorer {
  #speed = 150;
  #trackingSensors;
  #tracks;

  set speed(speed) {
    this.#speed = speed;
    this.#tracks.speed = speed;
  }

  // setter for injecting a mock
  set trackingSensors(trackingSensors) {
    this.#trackingSensors = trackingSensors;
  }

  // setter for injecting a mock
  set tracks(tracks) {
    this.#tracks = tracks;
  }

  constructor() {
    this.#tracks = new Tracks(this.#speed);
    this.#trackingSensors = new TrackingSensors(this.setDirection(this.#tracks));
  }

  go() {
    this.setDirection(this.#tracks)(Direction.FORWARD);
  }

  setDirection(tracks) {
    return (direction) => {
      switch (direction) {
        case Direction.BACK:
          tracks.moveBack();
          break;
        case Direction.FORWARD:
          tracks.moveForward();
          break;
        case Direction.LEFT:
          tracks.moveLeft();
          break;
        case Direction.RIGHT:
          tracks.moveRight();
          break;
        default:
          tracks.stop();
      }
    }
  }

  stop() {
    this.#tracks.stop();
  }
}

module.exports = { Explorer }