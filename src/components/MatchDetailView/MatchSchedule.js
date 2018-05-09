import React from 'react';
import MatchScheduleItem from './MatchScheduleItem';
import { overlapSchedules } from '../../util/schedules';
import { connect } from 'react-redux';
import './MatchDetail.css';

const MatchSchedule = ({
  userSchedule,
  matchSchedule,
  matchGym,
  gymsById,
}) => {
  const scheduleItems = overlapSchedules(userSchedule, matchSchedule);
  const scheduleItemEls = scheduleItems.map((item, i) => {
    return <MatchScheduleItem key={ i } item={ item }/>
  });
  const gym = gymsById[matchGym].name;

  return (
    <div className="matchdetail-schedule">
      <div className="matchdetail-schedule-header">
        Matches your schedule on ...
      </div>
      <div className="matchdetail-schedule-tags">
        { scheduleItemEls }
      </div>
      <div className="matchdetail-schedule-gym">
        at&nbsp;{ gym }
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  gymsById: state.gymsById,
});

export default connect(
  mapStateToProps
)(MatchSchedule);
