import axios from 'axios';
import BaseURL from '../BaseURL';

export const USER_RECEIVED = 'USER_INFO_RECEIVED';
export function fetchUser(token) {
  return async (dispatch) => {
    const response = await axios.get(
      `${BaseURL}/users/`,
      { headers: { token } }
    );
    const user = response.data.user;
    dispatch({ type: USER_RECEIVED, user });
  }
}

export const USER_CLEARED = 'USER_INFO_CLEARED';
export const CLIMBERS_CLEARED = 'CLIMBERS_CLEARED';
export function logout() {
  return (dispatch) => {
    dispatch({ type: USER_CLEARED });
    dispatch({ type: CLIMBERS_CLEARED });
  }
}

export const CLIMBERS_RECEIVED = 'CLIMBERS_RECEIVED';
export function fetchClimbers(token, zip) {
  return async (dispatch, getState) => {
    if (getState().climbers.length) return;
    const response = await axios.get(
      `${BaseURL}/users?zip=${zip}`,
      { headers: { token } }
    );
    const { user } = getState();
    const climbers = response.data.climbers.filter(climber => {
      return climber.id !== user.id;
    });
    dispatch({ type: CLIMBERS_RECEIVED, climbers });
  }
}
