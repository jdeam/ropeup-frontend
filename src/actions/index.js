import axios from 'axios';
import { compareSchedules } from '../util/schedules';
import {
  sbConnect,
  sbDisconnect,
  sbUpdateUser,
  sbCreateChannel,
} from '../sendbirdActions';
const BaseURL = process.env.REACT_APP_BASE_URL;

export const DASHBOARD_TAB_SWITCHED = 'DASHBOARD_TAB_SWITCHED';
export function switchDashboardTab(tab) {
  return (dispatch, getState) => {
    const { dashboardTabInView } = getState();
    if (dashboardTabInView !== tab) {
      dispatch({ type: DASHBOARD_TAB_SWITCHED, tab });
    }
  };
}

export const TOKEN_RECEIVED = 'TOKEN_RECEIVED';
export function fetchToken() {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (token) dispatch({ type: TOKEN_RECEIVED, token });
  };
}

export const FETCHING_USER = 'FETCHING_USER';
export const FETCHING_USER_CANCELED ='FETCHING_USER_CANCELED';
export const USER_RECEIVED = 'USER_RECEIVED';
export function fetchUser() {
  return async (dispatch, getState) => {
    const { token, fetchingUser } = getState();
    if (!token) {
      return dispatch({ type: FETCHING_USER_CANCELED });
    }
    if (!fetchingUser) dispatch({ type: FETCHING_USER });
    const response = await axios.get(
      `${BaseURL}/users/`,
      { headers: { token } }
    );
    const { user } = response.data;
    dispatch({ type: USER_RECEIVED, user });
  };
}

export const FETCHING_SCHEDULE = 'FETCHING_SCHEDULE';
export const FETCHING_SCHEDULE_CANCELED = 'FETCHING_SCHEDULE_CANCELED';
export const SCHEDULE_RECEIVED = 'SCHEDULE_RECEIVED';
export function fetchSchedule() {
  return async (dispatch, getState) => {
    const { token, user, fetchingSchedule } = getState();
    if (!token || !user.id) {
      return dispatch({ type: FETCHING_SCHEDULE_CANCELED });
    }
    if (!fetchingSchedule) dispatch({ type: FETCHING_SCHEDULE });
    const response = await axios.get(
      `${BaseURL}/users/${user.id}/schedule`,
      { headers: { token } }
    );
    const { schedule } = response.data;
    dispatch({ type: SCHEDULE_RECEIVED, schedule });
  };
}

export const FETCHING_MATCHES = 'FETCHING_MATCHES';
export const FETCHING_MATCHES_CANCELED = 'FETCHING_MATCHES_CANCELED';
export const MATCHES_RECEIVED = 'MATCHES_RECEIVED';
export function fetchMatches() {
  return async (dispatch, getState) => {
    const { token, user, schedule, fetchingMatches } = getState();
    if (!token || !user.zip || !schedule) {
      return dispatch({ type: FETCHING_MATCHES_CANCELED });
    }
    if (!fetchingMatches) dispatch({ type: FETCHING_MATCHES });
    const response = await axios.get(
      `${BaseURL}/users?zip=${user.zip}`,
      { headers: { token } }
    );
    const { users } = response.data;
    const usersWithMatch = users.map(user => {
        user.match = compareSchedules(schedule, user.schedule);
        return user;
      })
      .filter(user => user.match > 0)
      .sort((userA, userB) => {
        return userB.match - userA.match;
      });
    dispatch({ type: MATCHES_RECEIVED, matches: usersWithMatch });
  };
}

export const TOKEN_CLEARED = 'TOKEN_CLEARED';
export const USER_CLEARED = 'USER_CLEARED';
export const SCHEDULE_CLEARED = 'SCHEDULE_CLEARED';
export const MATCHES_CLEARED = 'MATCHES_CLEARED';
export const DASHBOARD_TAB_RESET = 'DASHBOARD_TAB_RESET';
export const SB_LOGOUT_SUCCESS = 'SB_LOGOUT_SUCCESS';
export function logout() {
  return (dispatch) => {
    dispatch({ type: TOKEN_CLEARED });
    dispatch({ type: USER_CLEARED });
    dispatch({ type: SCHEDULE_CLEARED });
    dispatch({ type: MATCHES_CLEARED });
    dispatch({ type: DASHBOARD_TAB_RESET });
    dispatch(sbLogout());
    localStorage.removeItem('token');
  };
}

export function sbLogout() {
  return (dispatch) => {
    sbDisconnect()
      .then(() => dispatch({type: SB_LOGOUT_SUCCESS }));
  };
}

export function clearMatches() {
  return (dispatch) => {
    dispatch({ type: MATCHES_CLEARED });
  };
}

export function fetchAllUserInfo() {
  return async (dispatch) => {
    dispatch(fetchToken());
    dispatch({ type: FETCHING_USER });
    dispatch({ type: FETCHING_SCHEDULE });
    dispatch({ type: FETCHING_MATCHES });
    dispatch({ type: SB_FETCHING_DATA });
    await dispatch(fetchUser());
    dispatch(sbLogin());
    await dispatch(fetchSchedule());
    dispatch(fetchMatches());
  };
}

export const SB_FETCHING_DATA = 'SB_FETCHING_DATA';
export const SB_FETCHING_DATA_CANCELED = 'SB_FETCHING_DATA_CANCELED';
export const SB_LOGIN_SUCCESS = 'SB_LOGIN_SUCCESS';
export const SB_CHANNELS_RECEIVED = 'SB_CHANNELS_RECEIVED';
export function sbLogin() {
  return (dispatch, getState) => {
    const { user, fetchingSb } = getState();
    const { id, first_name, last_name, img_url } = user;
    if (!id) return dispatch({ type: SB_FETCHING_DATA_CANCELED });
    if (!fetchingSb) dispatch({ type: SB_FETCHING_DATA });
    const nickname = `${first_name} ${last_name[0]}.`;
    sbConnect(id, nickname, img_url)
      .then((data) => {
        dispatch({ type: SB_LOGIN_SUCCESS, sbUser: data.user });
        dispatch({ type: SB_CHANNELS_RECEIVED, sbChannels: data.channels });
      });
  };
}

export function sbAddChannel(recipientId) {
  return (dispatch, getState) => {
    const { sbUser } = getState();
    if (!sbUser) return;
    dispatch({ type: SB_FETCHING_DATA });
    sbCreateChannel(recipientId)
      .then((sbChannels) => {
        dispatch({ type: SB_CHANNELS_RECEIVED, sbChannels });
      });
  };
}

export function sbAddUserImage() {
  return (dispatch, getState) => {
    const { user, sbUser } = getState();
    if (!sbUser || !user.img_url) return;
    const { nickname } = sbUser;
    dispatch({ type: SB_FETCHING_DATA });
    sbUpdateUser(nickname, user.img_url)
      .then((sbUser) => {
        dispatch({ type: SB_LOGIN_SUCCESS, sbUser });
        dispatch({ type: SB_FETCHING_DATA_CANCELED });
      });
  };
}
