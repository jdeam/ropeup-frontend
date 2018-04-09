import axios from 'axios';
import BaseURL from '../BaseURL';
import { compareSchedules } from '../util/schedules';

export const USER_CLEARED = 'USER_CLEARED';
export const SCHEDULE_CLEARED = 'SCHEDULE_CLEARED';
export const CLIMBERS_CLEARED = 'CLIMBERS_CLEARED';
export function logout() {
  return (dispatch) => {
    dispatch({ type: USER_CLEARED });
    dispatch({ type: SCHEDULE_CLEARED });
    dispatch({ type: CLIMBERS_CLEARED });
  }
}

export const USER_RECEIVED = 'USER_RECEIVED';
export function fetchUser(token) {
  return async (dispatch) => {
    const response = await axios.get(
      `${BaseURL}/users/`,
      { headers: { token } }
    );
    const { user } = response.data;
    dispatch({ type: USER_RECEIVED, user });
    return user;
  }
}

export const SCHEDULE_RECEIVED = 'SCHEDULE_RECEIVED';
export function fetchSchedule(token, id) {
  return async (dispatch) => {
    const response = await axios.get(
      `${BaseURL}/users/${id}/schedule`,
      { headers: { token } }
    );
    const { schedule } = response.data;
    dispatch({ type: SCHEDULE_RECEIVED, schedule });
    return schedule;
  }
}

export const CLIMBERS_RECEIVED = 'CLIMBERS_RECEIVED';
export function fetchClimbers(token, zip, schedule) {
  return async (dispatch) => {
    const response = await axios.get(
      `${BaseURL}/users?zip=${zip}`,
      { headers: { token } }
    );
    const { climbers } = response.data;
    const climbersWithMatch = climbers.map(climber => {
        climber.match = compareSchedules(schedule, climber.schedule);
        return climber;
      })
      .filter(climber => climber.match > 0)
      .sort((climberA, climberB) => {
        return climberB.match - climberA.match;
      });
    dispatch({ type: CLIMBERS_RECEIVED, climbers: climbersWithMatch });
  }
}
