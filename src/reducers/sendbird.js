import {
  SB_LOGIN_SUCCESS,
  SB_LOGOUT_SUCCESS,
  SB_CHANNELS_RECEIVED,
  SB_FETCHING_STARTED,
  SB_FETCHING_CANCELED,
  SB_IMAGE_UPDATED,
  SB_CHANNEL_CREATED,
  SB_MESSAGES_RECEIVED,
  SB_SENDING_MESSAGE,
  SB_MESSAGE_SENT,
  SB_MESSAGE_RECEIVED,
  SB_MESSAGE_READ,
  SB_TYPING_STATUS_UPDATED,
  SB_REFRESH_INTERVAL_SET,
  // SB_NEW_CHANNELS_RECEIVED,
  // SB_NEW_MESSAGES_RECEIVED,
} from '../actions/sendbird';

export function sbIsFetching(state = false, action) {
  switch (action.type) {
    case SB_FETCHING_STARTED:
      return true;
    case SB_MESSAGES_RECEIVED:
      return false;
    case SB_IMAGE_UPDATED:
      return false;
    case SB_CHANNEL_CREATED:
      return false;
    case SB_FETCHING_CANCELED:
      return false;
    default:
      return state;
  }
}

export function sbUser(state = {}, action) {
  switch (action.type) {
    case SB_LOGIN_SUCCESS:
      return action.loggedInUser;
    case SB_IMAGE_UPDATED:
      return action.updatedUser;
    case SB_LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
}

export function sbChannels(state = [], action) {
  switch (action.type) {
    case SB_CHANNELS_RECEIVED:
      return action.channels;
    case SB_CHANNEL_CREATED:
      return [action.channel, ...state];
    case SB_MESSAGE_RECEIVED:
      return [...state].sort((channelA, channelB) => {
        const aSentAt = channelA.lastMessage.createdAt;
        const bSentAt = channelB.lastMessage.createdAt;
        return bSentAt - aSentAt;
      });
    // case SB_NEW_CHANNELS_RECEIVED:
    //   return [...action.newChannels, ...state];
    case SB_LOGOUT_SUCCESS:
      return [];
    default:
      return state;
  }
}

export function sbChannelsByUsername(state = {}, action) {
  switch (action.type) {
    case SB_CHANNELS_RECEIVED:
      const { channels, username } = action;
      return channels.reduce((byUsername, channel) => {
        const { members } = channel;
        const otherUsername = members.find(member => {
          return member.userId !== username;
        }).userId;
        byUsername[otherUsername] = channel;
        return byUsername;
      }, {});
    case SB_CHANNEL_CREATED:
      return { ...state,
        [action.otherUsername]: action.channel
      };
    // case SB_NEW_CHANNELS_RECEIVED:
    //   {
    //     const {
    //       newChannels,
    //       id
    //     } = action;
    //     const newChannelsByOtherUserId = newChannels.reduce((byOtherUserId, channel) => {
    //       const {
    //         members
    //       } = channel;
    //       const otherUserId = members.find(member => {
    //         return member.userId !== id;
    //       });
    //       byOtherUserId[otherUserId] = channel;
    //       return byOtherUserId;
    //     }, {});
    //     return { ...state,
    //       ...newChannelsByOtherUserId
    //     };
    //   }
    case SB_LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
}

export function sbMessagesByUsername(state = {}, action) {
  switch (action.type) {
    case SB_MESSAGES_RECEIVED:
      return action.messagesByUsername;
    case SB_MESSAGE_SENT:
      {
        const messageList = state[action.otherUsername];
        const newMessageList = [...messageList, action.message];
        return { ...state,
          [action.otherUsername]: newMessageList
        };
      }
    case SB_CHANNEL_CREATED:
      return { ...state,
        [action.otherUsername]: []
      };
    case SB_MESSAGE_RECEIVED:
      {
        const messageList = state[action.otherUsername] || [];
        const newMessageList = [...messageList, action.message];
        return { ...state,
          [action.otherUsername]: newMessageList
        };
      }
    // case SB_NEW_MESSAGES_RECEIVED:
    //   return { ...state,
    //     ...action.newMessagesByOtherUserId
    //   };
    case SB_LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
}

export function sbIsSending(state = false, action) {
  switch (action.type) {
    case SB_SENDING_MESSAGE:
      return true;
    case SB_MESSAGE_SENT:
      return false;
    default:
      return state;
  }
}

export function sbNumUnread(state = 0, action) {
  switch (action.type) {
    case SB_CHANNELS_RECEIVED:
      {
        return action.channels.reduce((numUnread, channel) => {
          const {
            unreadMessageCount
          } = channel;
          return numUnread + (unreadMessageCount ? 1 : 0);
        }, 0);
      }
    case SB_MESSAGE_RECEIVED:
      return action.sbChannels.reduce((numUnread, channel) => {
        const { unreadMessageCount } = channel;
        return numUnread + (unreadMessageCount ? 1 : 0);
      }, 0);
    case SB_MESSAGE_READ:
      return state - 1;
    case SB_LOGOUT_SUCCESS:
      return 0;
    default:
      return state;
  }
}

export function sbTypingStatusByUsername(state = {}, action) {
  switch (action.type) {
    case SB_CHANNELS_RECEIVED:
      {
        const { channels, username } = action;
        return channels.reduce((byUsername, channel) => {
          const { members } = channel;
          const otherUsername = members.find(member => {
            return member.userId !== username;
          }).userId;
          byUsername[otherUsername] = channel.isTyping();
          return byUsername;
        }, {});
      }
    case SB_CHANNEL_CREATED:
      return { ...state,
        [action.otherUsername]: false
      };
    case SB_MESSAGE_RECEIVED:
      return { ...state,
        [action.otherUsername]: false
      };
    case SB_TYPING_STATUS_UPDATED:
      return { ...state,
        [action.otherUsername]: action.isTyping
      };
    case SB_LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
}

export function sbRefreshInterval(state = null, action) {
  switch (action.type) {
    case SB_REFRESH_INTERVAL_SET:
      return action.interval;
    case SB_LOGOUT_SUCCESS:
      clearInterval(state);
      return null;
    default:
      return state;
  }
}