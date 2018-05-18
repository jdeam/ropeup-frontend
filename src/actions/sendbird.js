import SendBird from 'sendbird';
import {
  sbConnect,
  sbUpdateUser,
  sbDisconnect,
  sbFetchChannels,
  sbCreateChannel,
  sbFetchMessages,
  sbSendTextMessage,
} from '../sendbirdUtil';

export const SB_FETCHING_STARTED = 'SB_FETCHING_STARTED';
export const SB_LOGIN_SUCCESS = 'SB_LOGIN_SUCCESS';
export const SB_FETCHING_CANCELED = 'SB_FETCHING_CANCELED';

export function sbLogin() {
  return async (dispatch, getState) => {
    const { user } = getState();
    const { username, img_url } = user;
    if (!username) return;
    const loggedInUser = await sbConnect(username, img_url);
    dispatch({ type: SB_LOGIN_SUCCESS, loggedInUser });
    dispatch(sbSetRefreshInterfal());
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
    dispatch({ type: SB_LOGOUT_SUCCESS });
  };
}

export const SB_CHANNELS_RECEIVED = 'SB_CHANNELS_RECEIVED';

export function sbGetChannels() {
  return async (dispatch, getState) => {
    const { sbUser } = getState();
    if (!sbUser.userId) return;
    const channels = await sbFetchChannels();
    dispatch({
      type: SB_CHANNELS_RECEIVED,
      username: sbUser.userId,
      channels
    });
  };
}

export const SB_CHANNEL_CREATED = 'SB_CHANNEL_CREATED';

export function sbAddChannel(otherUsername) {
  return async (dispatch, getState) => {
    dispatch({ type: SB_FETCHING_STARTED });
    const channel = await sbCreateChannel(otherUsername);
    dispatch({
      type: SB_CHANNEL_CREATED,
      otherUsername,
      channel
    });
  };
}

export const SB_MESSAGES_RECEIVED = 'SB_MESSAGES_RECEIVED';

export function sbGetMessages() {
  return async (dispatch, getState) => {
    const { sbChannels, sbUser } = getState();
    if (!sbUser.userId) return dispatch({ type: SB_FETCHING_CANCELED });
    const channelProms = sbChannels.map(channel => {
      return sbFetchMessages(channel);
    });
    const messages = await Promise.all(channelProms);
    const messagesByUsername = messages.reduce((byUsername, messageList, i) => {
      const { members } = sbChannels[i];
      const otherUsername = members.find(member => {
        return member.userId !== sbUser.userId;
      }).userId;
      byUsername[otherUsername] = messageList;
      return byUsername;
    }, {});
    dispatch({ type: SB_MESSAGES_RECEIVED, messagesByUsername });
  };
}

export const SB_SENDING_MESSAGE = 'SB_SENDING_MESSAGE';
export const SB_MESSAGE_SENT = 'SB_MESSAGE_SENT';

export function sbSendMessage(channel, otherUsername, text) {
  return async (dispatch) => {
    dispatch({ type: SB_SENDING_MESSAGE });
    const message = await sbSendTextMessage(channel, text);
    dispatch({
      type: SB_MESSAGE_SENT,
      otherUsername,
      message
    });
  };
}

export const SB_MESSAGE_RECEIVED = 'SB_MESSAGE_RECEIVED';
export const SB_TYPING_STATUS_UPDATED = 'SB_TYPING_STATUS_UPDATED';

function sbRegisterChannelHandler(channelUrl, dispatch, getState) {
  const { sbUser, sbChannels } = getState();
  const sb = SendBird.getInstance();
  const channelHandler = new sb.ChannelHandler();

  channelHandler.onMessageReceived = (channel, message) => {
    if (channel.url === channelUrl) {
      const { members } = channel;
      const otherUsername = members.find(member => {
        return member.userId !== sbUser.userId;
      }).userId;
      dispatch({
        type: SB_MESSAGE_RECEIVED,
        otherUsername,
        message,
        sbChannels
      });
    }
  };
  channelHandler.onTypingStatusUpdated = (channel) => {
    if (channel.url === channelUrl) {
      const { members } = channel;
      const otherUsername = members.find(member => {
        return member.userId !== sbUser.userId;
      }).userId;

      const isTyping = channel.isTyping();
      dispatch({
        type: SB_TYPING_STATUS_UPDATED,
        otherUsername,
        isTyping
      });
    }
  };

  sb.addChannelHandler(channelUrl, channelHandler);
}

export function sbRegisterAllChannelHandlers() {
  return (dispatch, getState) => {
    const {
      sbChannels
    } = getState();
    sbChannels.forEach(channel => {
      sbRegisterChannelHandler(channel.url, dispatch, getState);
    });
  };
}

export const SB_MESSAGE_READ = 'SB_MESSAGE_READ';

export function sbMarkAsRead(channel) {
  return async (dispatch, getState) => {
    const {
      sbNumUnread
    } = getState();
    if (!sbNumUnread) return;
    if (!channel.unreadMessageCount) return;
    channel.markAsRead();
    dispatch({
      type: SB_MESSAGE_READ
    });
  };
}

export const SB_REFRESH_INTERVAL_SET = 'SB_REFRESH_INTERVAL_SET';

function sbSetRefreshInterfal() {
  return (dispatch, getState) => {
    const interval = setInterval(() => dispatch(sbRefresh()), 30000);
    dispatch({ type: SB_REFRESH_INTERVAL_SET, interval });
  };
}

// export const SB_NEW_CHANNELS_RECEIVED = 'SB_NEW_CHANNELS_RECEIVED';
// export const SB_NEW_MESSAGES_RECEIVED = 'SB_NEW_MESSAGES_RECEIVED';

function sbRefresh() {
  return async (dispatch, getState) => {
    // 
    
    // await dispatch(sbGetChannels());
    // await dispatch(sbGetMessages());
    // dispatch(sbRegisterAllChannelHandlers());

    // const { sbChannelsByOtherUserId, sbUser } = getState();
    // const channels = await sbFetchChannels();
    // const newChannels = channels.filter(channel => {
    //   const { members } = channel;
    //   const otherUserId = members.find(member => {
    //     return member.userId !== sbUser.userId;
    //   }).userId;
    //   return !(Object.keys(sbChannelsByOtherUserId).includes(otherUserId));
    // });
    // if (!newChannels.length) return;
    // dispatch({ type: SB_NEW_CHANNELS_RECEIVED, newChannels, id: sbUser.userId });

    // const newChannelProms = newChannels.map(channel => {
    //   return sbFetchMessages(channel);
    // });
    // const newMessages = await Promise.all(newChannelProms);
    // const newMessagesByOtherUserId = newMessages.reduce((byId, messageList, i) => {
    //   const { members } = newChannels[i];
    //   const otherUserId = members.find(member => {
    //     return member.userId !== sbUser.userId;
    //   }).userId;
    //   byId[otherUserId] = messageList;
    //   return byId;
    // }, {});
    // dispatch({ type: SB_NEW_MESSAGES_RECEIVED, newMessagesByOtherUserId });

    // newChannels.forEach(channel => {
    //   sbRegisterChannelHandler(channel.url, dispatch, getState)
    // });
  };
}