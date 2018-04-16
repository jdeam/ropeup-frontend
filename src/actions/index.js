import axios from 'axios';
import { calculateMatchRating } from '../util/schedules';
import {
  sbConnect,
  sbUpdateUser,
  sbDisconnect,
  sbFetchChannels,
  sbCreateChannel,
  sbFetchMessages,
  sbSendTextMessage,
} from '../sendbirdActions';
import SendBird from 'sendbird';
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
export const USER_RECEIVED = 'USER_RECEIVED';
export const FETCHING_USER_CANCELED ='FETCHING_USER_CANCELED';
export function fetchUser() {
  return async (dispatch, getState) => {
    const { token, fetchingUser } = getState();
    if (!token) return dispatch({ type: FETCHING_USER_CANCELED });
    if (!fetchingUser) dispatch({ type: FETCHING_USER });
    const response = await axios.get(
      `${BaseURL}/users/`,
      { headers: { token } }
    );
    const { user } = response.data;
    dispatch({ type: USER_RECEIVED, user });
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
export const MATCHES_RECEIVED = 'MATCHES_RECEIVED';
export const FETCHING_MATCHES_CANCELED = 'FETCHING_MATCHES_CANCELED';
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

export const MATCHES_CLEARED = 'MATCHES_CLEARED';
export function clearMatches() {
  return (dispatch) => {
    dispatch({ type: MATCHES_CLEARED });
  };
}

export const TOKEN_CLEARED = 'TOKEN_CLEARED';
export const USER_CLEARED = 'USER_CLEARED';
export const SCHEDULE_CLEARED = 'SCHEDULE_CLEARED';
export const DASHBOARD_TAB_RESET = 'DASHBOARD_TAB_RESET';
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
    await dispatch(sbGetChannels());
    await dispatch(fetchMatches());
    await dispatch(sbGetMessages());
    dispatch(sbRegisterAllChannelHandlers());
  };
}

export const SB_FETCHING_STARTED = 'SB_FETCHING_STARTED';
export const SB_LOGIN_SUCCESS = 'SB_LOGIN_SUCCESS';
export const SB_FETCHING_CANCELED = 'SB_FETCHING_CANCELED';
export function sbLogin() {
  return async (dispatch, getState) => {
    const { user } = getState();
    const { id, first_name, last_name, img_url } = user;
    if (!id) return;
    const nickname = `${first_name} ${last_name[0]}.`;
    const loggedInUser = await sbConnect(id, nickname, img_url);
    dispatch({ type: SB_LOGIN_SUCCESS, loggedInUser });
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
    dispatch({ type: SB_IMAGE_UPDATED, updatedUser });
  };
}

export const SB_LOGOUT_SUCCESS = 'SB_LOGOUT_SUCCESS';
export function sbLogout() {
  return async (dispatch) => {
    await sbDisconnect();
    dispatch({type: SB_LOGOUT_SUCCESS });
  };
}

export const SB_CHANNELS_RECEIVED = 'SB_CHANNELS_RECEIVED';
export function sbGetChannels() {
  return async (dispatch, getState) => {
    const { sbUser } = getState();
    if (!sbUser.userId) return;
    const channels = await sbFetchChannels();
    dispatch({ type: SB_CHANNELS_RECEIVED, id: sbUser.userId, channels });
  };
}

export const SB_CHANNEL_CREATED = 'SB_CHANNEL_CREATED';
export function sbAddChannel(otherUserId) {
  return async (dispatch, getState) => {
    dispatch({ type: SB_FETCHING_STARTED });
    const channel = await sbCreateChannel(otherUserId);
    dispatch({ type: SB_CHANNEL_CREATED, otherUserId, channel });
  };
}

export const SB_MESSAGES_RECEIVED = 'SB_MESSAGES_RECEIVED';
export function sbGetMessages(channels) {
  return async (dispatch, getState) => {
    const { sbChannels, sbUser } = getState();
    if (!sbUser.userId) return dispatch({ type: SB_FETCHING_CANCELED });
    const channelProms = sbChannels.map(channel => {
      return sbFetchMessages(channel);
    });
    const messages = await Promise.all(channelProms);
    const messagesByOtherUserId = messages.reduce((byId, messageList, i) => {
      const { members } = sbChannels[i];
      const otherUserId = members.find(member => {
        return member.userId !== sbUser.userId;
      }).userId;
      byId[otherUserId] = messageList;
      return byId;
    }, {});
    dispatch({ type: SB_MESSAGES_RECEIVED, messagesByOtherUserId });
  };
}

export const SB_SENDING_MESSAGE = 'SB_SENDING_MESSAGE';
export const SB_MESSAGE_SENT = 'SB_MESSAGE_SENT';
export function sbSendMessage(channel, otherUserId, text) {
  return async (dispatch) => {
    dispatch({ type: SB_SENDING_MESSAGE });
    const message = await sbSendTextMessage(channel, text);
    dispatch({ type: SB_MESSAGE_SENT, otherUserId, message });
  };
}

export const SB_MESSAGE_RECEIVED = 'SB_MESSAGE_RECEIVED';
export const SB_TYPING_STATUS_UPDATED = 'SB_TYPING_STATUS_UPDATED';
export function sbRegisterChannelHandler(channelUrl, dispatch, getState) {
  const { sbUser } = getState();
  const sb = SendBird.getInstance();
  const channelHandler = new sb.ChannelHandler();

  channelHandler.onMessageReceived = (channel, message) => {
    if (channel.url === channelUrl) {
      const { members } = channel;
      const otherUserId = members.find(member => {
        return member.userId !== sbUser.userId;
      }).userId;
      dispatch({ type: SB_MESSAGE_RECEIVED, otherUserId, message });
    }
  };
  channelHandler.onTypingStatusUpdated = (channel) => {
    if (channel.url === channelUrl) {
      const { members } = channel;
      const otherUserId = members.find(member => {
        return member.userId !== sbUser.userId;
      }).userId;

      const isTyping = channel.isTyping();
      dispatch({ type: SB_TYPING_STATUS_UPDATED, otherUserId, isTyping });
    }
  };

  sb.addChannelHandler(channelUrl, channelHandler);
}

export function sbRegisterAllChannelHandlers() {
  return (dispatch, getState) => {
    const { sbChannels } = getState();
    const activeChannels = sbChannels.filter(channel => channel.lastMessage);
    activeChannels.forEach(channel => {
      sbRegisterChannelHandler(channel.url, dispatch, getState);
    });
  };
}

export const SB_MESSAGE_READ = 'SB_MESSAGE_READ';
export function sbMarkAsRead(channel) {
  return (dispatch, getState) => {
    const { unreadMessageCount } = channel;
    if (unreadMessageCount) {
      dispatch({ type: SB_MESSAGE_READ });
      channel.markAsRead();
    }
  };
}
