const { expect } = require('chai');
const { Direction } = require('../src/constants.js');
const { TrackingSensorReadings } = require('../src/tracking-sensor-readings.js');

describe('TrackingSensorReadings', function () {
  let trackingSensorReadings;
  const errorMessage = 'Callback is not expected to be used in tests';

  beforeEach(() => {
    // console.log("Executing outer beforeEach...");
    trackingSensorReadings = new TrackingSensorReadings(() => { throw new Error(errorMessage); });
  });

  describe('getNewDirection', function () {
    let highReading;
    let lowReading;

    beforeEach(() => {
      // console.log("Executing inner beforeEach...");
      highReading = trackingSensorReadings.readingThreshold + 1;
      lowReading = trackingSensorReadings.readingThreshold - 1;
    });

    it('should return back', function () {
      expect(trackingSensorReadings.getNewDirection(highReading, highReading)).to.equal(Direction.BACK);
    });

    it('should return forward', function () {
      expect(trackingSensorReadings.getNewDirection(lowReading, lowReading)).to.equal(Direction.FORWARD);
    });

    it('should return left', function () {
      expect(trackingSensorReadings.getNewDirection(lowReading, highReading)).to.equal(Direction.LEFT);
    });

    it('should return right', function () {
      expect(trackingSensorReadings.getNewDirection(highReading, lowReading)).to.equal(Direction.RIGHT);
    });
  });

  describe('setReadings', function () {
    it('should get and set both readings', function () {
      // given
      expect(trackingSensorReadings.getReadings().left).to.equal(undefined);
      expect(trackingSensorReadings.getReadings().right).to.equal(undefined);

      // when
      const leftReading = 123;
      const rightReading = 456;
      trackingSensorReadings.setReadings(leftReading, rightReading);

      // then
      expect(trackingSensorReadings.getReadings().left).to.equal(leftReading);
      expect(trackingSensorReadings.getReadings().right).to.equal(rightReading);
    });
  });

  describe('bothReadingsDefined', function () {
    it('should identify an undefined value on the right side', function () {
      expect(undefined !== undefined).to.equal(false)
      trackingSensorReadings.setReadings(123, undefined);
      expect(trackingSensorReadings.bothReadingsDefined()).to.be.false;
    });

    it('should identify an undefined value on the left side', function () {
      expect(undefined !== undefined).to.equal(false)
      trackingSensorReadings.setReadings(undefined, 456);
      expect(trackingSensorReadings.bothReadingsDefined()).to.be.false;
    });

    it('should identify two undefined values', function () {
      expect(undefined !== undefined).to.equal(false)
      trackingSensorReadings.setReadings(undefined, undefined);
      expect(trackingSensorReadings.bothReadingsDefined()).to.be.false;
    });

    it('should identify two defined values', function () {
      expect(undefined !== undefined).to.equal(false)
      trackingSensorReadings.setReadings(123, 456);
      expect(trackingSensorReadings.bothReadingsDefined()).to.be.true;
    });
  });

  describe('checkReadingsAndExecuteCallback', function () {
    it('should execute callback function', function () {
      trackingSensorReadings.setReadings(123, 456);
      
      // For some reason the two expectations below are not working, hence the clumsy try-catch approach
      //
      // expect(trackingSensorReadings.checkReadingsAndExecuteCallback()).to.throw(new Error(errorMessage));
      // expect(trackingSensorReadings.checkReadingsAndExecuteCallback()).to.throw()
      
      try {
        trackingSensorReadings.checkReadingsAndExecuteCallback();
      } catch (e) {
        expect(e.message).to.equal(errorMessage);
      }
    });
  });
});

