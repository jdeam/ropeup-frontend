import { expect } from 'chai';
import { calculateScheduleMatch } from './schedules';
import { mockUserSchedule, mockMatchScheduleNone } from './mockSchedules';

describe("function calculateScheduleMatch tests", () => {
  it("should return 0 if schedules do not overlap at all.", () => {


    expect(calculateScheduleMatch(mockUserSchedule, mockMatchScheduleNone)).to.equal('0.00');
  });

  // it("should return an array of an array of activity strings when passed expected data shape.", () => {
  //   expect(looksActivitiesPlucker(mockTagsData)).to.deep.equal(mockActivitiesArr);
  // });
});
