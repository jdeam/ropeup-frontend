import axios from 'axios';
import { calculateMatchRating } from '../util/schedules';
import {
  sbConnect,
  sbCreateGroupChannelListQuery,
  sbFetchGroupChannels,
  sbDisconnect,
  sbUpdateUser,
  sbCreateChannel,
  sbGetPreviousMessages,
  sbSendTextMessage,
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
    dispatch({ type: SB_MESSAGES_CLEARED });
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
    dispatch({ type: SB_FETCHING_STARTED });
    await dispatch(fetchUser());
    await dispatch(sbLogin());
    await dispatch(fetchSchedule());
    dispatch(sbGetChannels());
    dispatch(fetchMatches());
  };
}

export const SB_FETCHING_STARTED = 'SB_FETCHING_STARTED';
export const SB_FETCHING_CANCELED = 'SB_FETCHING_CANCELED';
export const SB_LOGIN_SUCCESS = 'SB_LOGIN_SUCCESS';
export function sbLogin() {
  return async (dispatch, getState) => {
    const { user } = getState();
    const { id, first_name, last_name, img_url } = user;
    if (!id) return;
    const nickname = `${first_name} ${last_name[0]}.`;
    const sbUser = await sbConnect(id, nickname, img_url);
    dispatch({ type: SB_LOGIN_SUCCESS, sbUser });
  }
}

export const SB_CHANNELS_RECEIVED = 'SB_CHANNELS_RECEIVED';
export function sbGetChannels() {
  return async (dispatch, getState) => {
    const { isFetchingSb, sbUser } = getState();
    if (!sbUser.userId) return dispatch({ type: SB_FETCHING_CANCELED });
    if (!isFetchingSb) dispatch({ type: SB_FETCHING_STARTED });
    const groupChannelListQuery = sbCreateGroupChannelListQuery();
    const sbChannels = await sbFetchGroupChannels(groupChannelListQuery);
    dispatch({ type: SB_CHANNELS_RECEIVED, id: sbUser.userId, sbChannels });
  }
}

export const SB_CHANNEL_CREATED = 'SB_CHANNEL_CREATED';
export function sbAddChannel(recipientId) {
  return async (dispatch, getState) => {
    const { sbUser } = getState();
    if (!sbUser) return;
    dispatch({ type: SB_FETCHING_STARTED });
    const sbChannel = await sbCreateChannel(recipientId);
    dispatch({ type: SB_CHANNEL_CREATED, id: sbUser.userId, sbChannel });
  };
}

export const SB_IMAGE_UPDATED = 'SB_IMAGE_UPDATED';
export function sbAddUserImage() {
  return async (dispatch, getState) => {
    const { user, sbUser } = getState();
    if (!sbUser || !user.img_url) return;
    const { nickname } = sbUser;
    dispatch({ type: SB_FETCHING_STARTED });
    const updatedUser = await sbUpdateUser(nickname, user.img_url);
    dispatch({ type: SB_IMAGE_UPDATED, sbUser: updatedUser });
  };
}

export const SB_MESSAGES_RECEIVED = 'SB_MESSAGES_RECEIVED';
export const SB_MESSAGES_CLEARED = 'SB_MESSAGES_CLEARED';
export function sbLoadMessages(channel) {
  return async (dispatch) => {
    const sbMessages = await sbGetPreviousMessages(channel);
    dispatch({ type: SB_MESSAGES_RECEIVED, sbMessages });
  };
}

export const SB_MESSAGE_SENT = 'SB_MESSAGE_SENT';
export function sbSendMessage(channel, text) {
  return async (dispatch) => {
    const sbMessage = await sbSendTextMessage(channel, text);
    dispatch({ type: SB_MESSAGE_SENT, sbMessage });
  };
}
