import {
  expect
} from 'chai';
import {
  calculateScheduleMatch,
  overlapSchedules
} from './schedules';
import {
  mockUserSchedule,
  mockMatchScheduleNone,
  mockMatchScheduleAll,
  mockMatchScheduleHalf
} from './mockSchedules';

describe("function calculateScheduleMatch tests", () => {
  it("should return 0 if schedules do not overlap at all", () => {
    expect(calculateScheduleMatch(mockUserSchedule, mockMatchScheduleNone)).to.deep.equal('0.00');
  });

  it("should return 1 if matchSchedule overlaps completely with userSchedule", () => {
    expect(calculateScheduleMatch(mockUserSchedule, mockMatchScheduleAll)).to.deep.equal('1.00');
  });

  it("should return 0.5 if matchSchedule overlaps with 50% of userSchedule", () => {
    expect(calculateScheduleMatch(mockUserSchedule, mockMatchScheduleHalf)).to.deep.equal('0.50');
  });
});

describe("function overlapSchedules tests", () => {
  it("should return an empty array if schedules do not overlap at all", () => {
    expect(overlapSchedules(mockUserSchedule, mockMatchScheduleNone)).to.deep.equal([]);
  });

  it("should return an identical schedule to the user's if schedules overlap completely", () => {
    expect(overlapSchedules(mockUserSchedule, mockMatchScheduleAll)).to.deep.equal(mockUserSchedule);
  });

  it("should leave the match schedule unchanged if it overlaps completely with the user's schedule", () => {
    expect(overlapSchedules(mockUserSchedule, mockMatchScheduleHalf)).to.deep.equal(mockMatchScheduleHalf);
  });

  // it("should return a new schedule with just the overlapping times", () => {
  //   expect(overlapSchedules(mockUserSchedule, mockMatchScheduleQuarter)).to.deep.equal();
  // });
});