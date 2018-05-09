import axios from 'axios';
const BaseURL = process.env.REACT_APP_BASE_URL;

export const FETCHING_USER = 'FETCHING_USER';
export const USER_RECEIVED = 'USER_RECEIVED';
export const FETCHING_USER_CANCELED = 'FETCHING_USER_CANCELED';
export const USER_CLEARED = 'USER_CLEARED';

export function fetchUser() {
  return async (dispatch, getState) => {
    const { token, isFetchingUser } = getState();
    if (!token) return dispatch({ type: FETCHING_USER_CANCELED });
    if (!isFetchingUser) dispatch({ type: FETCHING_USER });
    const response = await axios.get(
      `${BaseURL}/users/`, {
        headers: { token }
      }
    );
    const { user } = response.data;
    const { schedule, gyms, ...rest } = user;
    dispatch({ type: USER_RECEIVED, user: rest });
    dispatch({ type: SCHEDULE_RECEIVED, schedule });
    dispatch({ type: GYMS_RECEIVED, gyms });
  };
}

export const USER_IMAGE_UPDATED = 'USER_IMAGE_UPDATED';

export function updateImgUrl(img_url) {
  return (dispatch) => {
    dispatch({ type: USER_IMAGE_UPDATED, img_url });
  };
}

export const FETCHING_SCHEDULE = 'FETCHING_SCHEDULE';
export const SCHEDULE_RECEIVED = 'SCHEDULE_RECEIVED';
export const FETCHING_SCHEDULE_CANCELED = 'FETCHING_SCHEDULE_CANCELED';
export const SCHEDULE_CLEARED = 'SCHEDULE_CLEARED';

export function fetchSchedule() {
  return async (dispatch, getState) => {
    const {
      token,
      user,
      isFetchingSchedule,
    } = getState();
    if (!token || !user.id) return dispatch({
      type: FETCHING_SCHEDULE_CANCELED
    });
    if (!isFetchingSchedule) dispatch({ type: FETCHING_SCHEDULE });
    const response = await axios.get(
      `${BaseURL}/users/${user.id}/schedule`, {
        headers: { token }
      }
    );
    const { schedule } = response.data;
    dispatch({ type: SCHEDULE_RECEIVED, schedule });
  };
}

export const FETCHING_GYMS = 'FETCHING_GYMS';
export const GYMS_RECEIVED = 'GYMS_RECEIVED';
export const FETCHING_GYMS_CANCELED = 'FETCHING_GYMS_CANCELED';
export const GYMS_CLEARED = 'GYMS_CLEARED';

export function fetchGyms() {
  return async(dispatch, getState) => {
    const {
      token,
      user,
      isFetchingGyms,
    } = getState();
    if (!token || !user.id) return dispatch({ type: FETCHING_GYMS_CANCELED });
    if (!isFetchingGyms) dispatch({ type: FETCHING_GYMS });
    const response = await axios.get(
      `${BaseURL}/gyms`, {
        headers: { token }
      }
    );
    const { gyms } = response.data;
    dispatch({ type: GYMS_RECEIVED, gyms });
  }
}