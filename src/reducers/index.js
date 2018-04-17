import { combineReducers } from 'redux';
import {
  DASHBOARD_TAB_SWITCHED,
  DASHBOARD_TAB_RESET,
  TOKEN_RECEIVED,
  TOKEN_CLEARED,
  FETCHING_USER,
  FETCHING_USER_CANCELED,
  USER_RECEIVED,
  USER_IMAGE_UPDATED,
  USER_CLEARED,
  FETCHING_SCHEDULE,
  FETCHING_SCHEDULE_CANCELED,
  SCHEDULE_RECEIVED,
  SCHEDULE_CLEARED,
  FETCHING_MATCHES,
  FETCHING_MATCHES_CANCELED,
  MATCHES_RECEIVED,
  MATCHES_CLEARED,
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
} from '../actions';

function dashboardTabInView(state = 'settings', action) {
  switch (action.type) {
    case DASHBOARD_TAB_SWITCHED:
      return action.tab;
    case DASHBOARD_TAB_RESET:
      return 'settings';
    default:
      return state;
  }
}

function token(state = '', action) {
  switch (action.type) {
    case TOKEN_RECEIVED:
      return action.token;
    case TOKEN_CLEARED:
      return '';
    default:
      return state;
  }
}

function isFetchingUser(state = false, action) {
  switch(action.type) {
    case FETCHING_USER:
      return true;
    case USER_RECEIVED:
      return false;
    case FETCHING_USER_CANCELED:
      return false;
    default:
      return state;
  }
}

function user(state = {}, action) {
  switch (action.type) {
    case USER_RECEIVED:
      return action.user;
    case USER_IMAGE_UPDATED:
      return { ...state, img_url: action.img_url };
    case USER_CLEARED:
      return {};
    default:
      return state;
  }
}

function isFetchingSchedule(state = false, action) {
  switch (action.type) {
    case FETCHING_SCHEDULE:
      return true;
    case SCHEDULE_RECEIVED:
      return false;
    case FETCHING_SCHEDULE_CANCELED:
      return false;
    default:
      return state;
  }
}

function schedule(state = [], action) {
  switch (action.type) {
    case SCHEDULE_RECEIVED:
      return action.schedule;
    case SCHEDULE_CLEARED:
      return [];
    default:
      return state;
  }
}

function isFetchingMatches(state = false, action) {
  switch (action.type) {
    case FETCHING_MATCHES:
      return true;
    case MATCHES_RECEIVED:
      return false;
    case FETCHING_MATCHES_CANCELED:
      return false;
    default:
      return state;
  }
}

function matches(state = [], action) {
  switch (action.type) {
    case MATCHES_RECEIVED:
      return action.matches;
    case MATCHES_CLEARED:
      return [];
    default:
      return state;
  }
}

function matchesById(state = {}, action) {
  switch (action.type) {
    case MATCHES_RECEIVED:
      return action.matches.reduce((byId, match) => {
        const { id } = match;
        byId[id] = match;
        return byId;
      }, {});
    case MATCHES_CLEARED:
      return {};
    default:
      return state;
  }
}

function sbIsFetching(state = false, action) {
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

function sbUser(state = {}, action) {
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

function sbChannels(state = [], action) {
  switch (action.type) {
    case SB_CHANNELS_RECEIVED:
      return action.channels;
    case SB_CHANNEL_CREATED:
      return [action.channel, ...state];
    case SB_LOGOUT_SUCCESS:
      return [];
    default:
      return state;
  }
}

function sbChannelsByOtherUserId(state = {}, action) {
  switch (action.type) {
    case SB_CHANNELS_RECEIVED:
      const { channels, id } = action;
      return channels.reduce((byOtherUserId, channel) => {
        const { members } = channel;
        const otherUserId = members.find(member => {
          return member.userId !== id;
        }).userId;
        byOtherUserId[otherUserId] = channel;
        return byOtherUserId;
      }, {});
    case SB_CHANNEL_CREATED:
      return { ...state, [action.otherUserId]: action.channel };
    case SB_LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
}

function sbMessagesByOtherUserId(state = {}, action) {
  switch (action.type) {
    case SB_MESSAGES_RECEIVED:
      return action.messagesByOtherUserId;
    case SB_MESSAGE_SENT: {
      const messageList = state[action.otherUserId];
      const newMessageList = [...messageList, action.message];
      return { ...state, [action.otherUserId]: newMessageList };
    }
    case SB_CHANNEL_CREATED:
      return { ...state, [action.otherUserId]: [] };
    case SB_MESSAGE_RECEIVED: {
      const messageList = state[action.otherUserId] || [];
      const newMessageList = [...messageList, action.message];
      return { ...state, [action.otherUserId]: newMessageList };
    }
    case SB_LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
}

function sbIsSending(state = false, action) {
  switch (action.type) {
    case SB_SENDING_MESSAGE:
      return true;
    case SB_MESSAGE_SENT:
      return false;
    default:
      return state;
  }
}

function sbNumUnread(state = 0, action) {
  switch (action.type) {
    case SB_CHANNELS_RECEIVED: {
      return action.channels
        .filter(channel => channel.lastMessage)
        .reduce((numUnread, channel) => {
          const { unreadMessageCount } = channel;
          return numUnread + (unreadMessageCount ? 1 : 0);
        }, 0);
    }
    case SB_MESSAGE_RECEIVED:
      return state + 1;
    case SB_MESSAGE_READ:
      return state - 1;
    case SB_LOGOUT_SUCCESS:
      return 0;
    default:
      return state;
  }
}

function sbTypingStatusByOtherUserId(state = {}, action) {
  switch (action.type) {
    case SB_CHANNELS_RECEIVED: {
      const { channels, id } = action;
      return channels.reduce((byOtherUserId, channel) => {
        const { members } = channel;
        const otherUserId = members.find(member => {
          return member.userId !== id;
        }).userId;
        byOtherUserId[otherUserId] = channel.isTyping();
        return byOtherUserId;
      }, {});
    }
    case SB_CHANNEL_CREATED:
      return { ...state, [action.otherUserId]: false };
    case SB_MESSAGE_RECEIVED:
      return { ...state, [action.otherUserId]: false };
    case SB_TYPING_STATUS_UPDATED:
      return { ...state, [action.otherUserId]: action.isTyping };
    case SB_LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
}

export default combineReducers({
  dashboardTabInView,
  token,
  isFetchingUser,
  user,
  isFetchingSchedule,
  schedule,
  isFetchingMatches,
  matches,
  matchesById,
  sbIsFetching,
  sbUser,
  sbChannels,
  sbChannelsByOtherUserId,
  sbMessagesByOtherUserId,
  sbIsSending,
  sbNumUnread,
  sbTypingStatusByOtherUserId,
});
