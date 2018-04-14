import axios from 'axios';
import { calculateMatchRating } from '../util/schedules';
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
    const matchesWithRating = users.map(user => {
        user.matchRating = calculateMatchRating(schedule, user.schedule);
        return user;
      })
      .filter(user => user.matchRating > 0)
      .sort((userA, userB) => {
        return userB.matchRating - userA.matchRating;
      });
    dispatch({ type: MATCHES_RECEIVED, matches: matchesWithRating });
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
    dispatch(sbLoginAndGetChannels());
    await dispatch(fetchSchedule());
    dispatch(fetchMatches());
  };
}

export const SB_FETCHING_DATA = 'SB_FETCHING_DATA';
export const SB_FETCHING_DATA_CANCELED = 'SB_FETCHING_DATA_CANCELED';
export const SB_LOGIN_SUCCESS = 'SB_LOGIN_SUCCESS';
export const SB_CHANNELS_RECEIVED = 'SB_CHANNELS_RECEIVED';
export function sbLoginAndGetChannels() {
  return async (dispatch, getState) => {
    const { user, isFetchingSb } = getState();
    const { id, first_name, last_name, img_url } = user;
    if (!id) return dispatch({ type: SB_FETCHING_DATA_CANCELED });
    if (!isFetchingSb) dispatch({ type: SB_FETCHING_DATA });
    const nickname = `${first_name} ${last_name[0]}.`;
    const sbData = await sbConnect(id, nickname, img_url);
    const { sbUser, sbChannels } = sbData;
    dispatch({ type: SB_LOGIN_SUCCESS, sbUser });
    dispatch({ type: SB_CHANNELS_RECEIVED, sbChannels, id });
  };
}

export function sbAddChannel(recipientId) {
  return async (dispatch, getState) => {
    const { sbUser, user } = getState();
    if (!sbUser) return;
    const { id } = user;
    dispatch({ type: SB_FETCHING_DATA });
    const sbChannels = await sbCreateChannel(recipientId);
    dispatch({ type: SB_CHANNELS_RECEIVED, sbChannels, id });
  };
}

export const SB_IMAGE_UPDATED = 'SB_IMAGE_UPDATED';
export function sbAddUserImage() {
  return async (dispatch, getState) => {
    const { user, sbUser } = getState();
    if (!sbUser || !user.img_url) return;
    const { nickname } = sbUser;
    dispatch({ type: SB_FETCHING_DATA });
    const updatedUser = await sbUpdateUser(nickname, user.img_url);
    dispatch({ type: SB_IMAGE_UPDATED, sbUser: updatedUser });
  };
}
