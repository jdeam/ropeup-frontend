import axios from 'axios';
import BaseURL from '../BaseURL';

export const USER_INFO_RECEIVED = 'USER_INFO_RECEIVED';
export function fetchUserInfo(token) {
  return async (dispatch) => {
    const response = await axios.get(
      `${BaseURL}/users/`,
      { headers: { token } }
    );
    const user_info = response.data.user;
    dispatch({ type: USER_INFO_RECEIVED, user_info });
  }
}

export const USER_INFO_CLEARED = 'USER_INFO_CLEARED';
export function logout() {
  return (dispatch) => {
    dispatch({ type: USER_INFO_CLEARED });
  }
}

export const CLIMBERS_RECEIVED = 'CLIMBERS_RECEIVED';
