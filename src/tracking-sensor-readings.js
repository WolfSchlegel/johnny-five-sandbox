const { Direction } = require('./constants.js');

class TrackingSensorReadings {
  #callback;
  #leftReading;
  #rightReading;

  static #ReadingThreshold = 500;

  get readingThreshold() {
    return TrackingSensorReadings.#ReadingThreshold
  }

  constructor(callback) {
    this.#callback = callback;
  }

  bothReadingsDefined() {
    return ( this.#leftReading !== undefined && this.#rightReading !== undefined );
  }

  checkReadingsAndExecuteCallback() {
    this.logReadings();
    if (this.bothReadingsDefined()) {
      this.#callback(
        this.getNewDirection(this.#leftReading, this.#rightReading)
      );
    }
  }

  getNewDirection(leftReading, rightReading) {
    const leftSensorOnBlack = leftReading < TrackingSensorReadings.#ReadingThreshold;
    const rightSensorOnBlack = rightReading < TrackingSensorReadings.#ReadingThreshold;

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
    return { left: this.#leftReading, right: this.#rightReading };
  }

  logReadings() {
    console.dir( this.getReadings() ); 
  }

  setReadings(leftReading, rightReading) {
    this.#leftReading = leftReading;
    this.#rightReading = rightReading;
  }

}

module.exports = { TrackingSensorReadings }
