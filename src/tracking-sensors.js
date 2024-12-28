const five = require('johnny-five');
const { Direction } = require('./constants.js');

class TrackingSensors {
  #callback;

  #leftSensor;
  #leftSensorReading;

  #rightSensor;
  #rightSensorReading;

  static #ReadingThreshold = 500;

  constructor(callback) {
    this.#callback = callback;

    this.#leftSensor = new five.Sensor({
      pin: "A0", // yellow cable
      // freq: 10,
      threshold: 100
    });

    this.#rightSensor = new five.Sensor({
      pin: "A0", // blue cable
      // freq: 10,
      threshold: 100
    });

    const newObject = this;

    this.#leftSensor.on(
      "change", 
      function (value, error) {
        newObject.#leftSensorReading = value;
        newObject.checkReadingsAndExecuteCallback();
      }
    );
    
    this.#rightSensor.on(
      "change", 
      function (value, error) { 
        newObject.#rightSensorReading = value;
        newObject.checkReadingsAndExecuteCallback();
      }
    );
  }

  bothReadingsDefined() {
    return typeof this.#leftSensorReading !== undefined && typeof this.#leftSensorReading !== undefined;
  }

  checkReadingsAndExecuteCallback() {
    this.logReadings();
    if (this.bothReadingsDefined()) {
      this.#callback(
        this.getNewDirection(this.#leftSensorReading, this.#rightSensorReading)
      );
    }
  }

  getNewDirection(leftSensorReading, rightSensorReading) {
    const leftSensorOnBlack = leftSensorReading < TrackingSensors.#ReadingThreshold;
    const rightSensorOnBlack = rightSensorReading < TrackingSensors.#ReadingThreshold;

    if (leftSensorOnBlack && rightSensorOnBlack) {
      return Direction.FORWARD;
    }
    if (leftSensorOnBlack && !rightSensorOnBlack) {
      return Direction.LEFT;
    }
    if (!leftSensorOnBlack && rightSensorOnBlack) {
      return Direction.RIGHT;
    }
    if (!leftSensorOnBlack && !rightSensorOnBlack) {
      return Direction.BACK;
    }
    return Direction.FORWARD;
  }

  getReadings() {
    return { left: this.#leftSensorReading, right: this.#rightSensorReading };
  }

  logReadings() {
    console.dir( this.getReadings() ); 
  }
}

module.exports = { TrackingSensors }
