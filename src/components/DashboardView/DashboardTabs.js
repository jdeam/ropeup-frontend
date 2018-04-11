import React from 'react';
import DashboardEdit from './DashboardEdit';
import DashboardSchedule from './DashboardSchedule';
import DashboardSettings from './DashboardSettings';
import FontAwesome from 'react-fontawesome';
import { switchDashboardTab } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './Dashboard.css';

const DashboardTabs = ({
  edit,
  schedule,
  settings,
  switchDashboardTab,
}) => {
  return (
    <div>
      <div className="tabs is-boxed is-centered">
        <ul>
          <li className={ edit ? "is-active" : "" }>
            <a
              className="dashboard-tab"
              onClick={ () => switchDashboardTab('edit') }
            >
              <span className="icon is-small">
                <FontAwesome name="edit" />
              </span>
              <span><small>My Info</small></span>
            </a>
          </li>
          <li className={ schedule ? "is-active" : "" }>
            <a
              className="dashboard-tab"
              onClick={ () => switchDashboardTab('schedule') }
            >
              <span className="icon is-small">
                <FontAwesome name="calendar-o" />
              </span>
              <span><small>Sched.</small></span>
            </a>
          </li>
          <li className={ settings ? "is-active" : "" }>
            <a
              className="dashboard-tab"
              onClick={ () => switchDashboardTab('settings') }
            >
              <span className="icon is-small">
                <FontAwesome name="cog" />
              </span>
              <span><small>Settings</small></span>
            </a>
          </li>
        </ul>
      </div>
      <DashboardEdit
        isActive={ edit }
      />
      <DashboardSchedule
        isActive={ schedule }
      />
      <DashboardSettings
        isActive={ settings }
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  switchDashboardTab,
}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(DashboardTabs);
