import React from 'react';
import FontAwesome from 'react-fontawesome';

const DashboardTabs = ({
  schedule,
  edit,
  activateSchedule,
  activateEdit
}) => {

  return (
    <div className="tabs is-boxed is-centered">
      <ul>
        <li className={ schedule ? "is-active" : "" }>
          <a onClick={ activateSchedule }>
            <span className="icon is-small">
              <FontAwesome name="calendar-o" />
            </span>
            <span>Schedule</span>
          </a>
        </li>
        <li className={ edit ? "is-active" : "" }>
          <a onClick={ activateEdit }>
            <span className="icon is-small">
              <FontAwesome name="edit" />
            </span>
            <span>Edit Info</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default DashboardTabs;
