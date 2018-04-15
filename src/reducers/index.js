import { combineReducers } from 'redux';
import {
  DASHBOARD_TAB_SWITCHED,
  DASHBOARD_TAB_RESET,
  TOKEN_RECEIVED,
  TOKEN_CLEARED,
  FETCHING_USER,
  FETCHING_USER_CANCELED,
  USER_RECEIVED,
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
  SB_MESSAGE_SENT,
} from '../actions';

function dashboardTabInView(state = 'edit', action) {
  switch (action.type) {
    case DASHBOARD_TAB_SWITCHED:
      return action.tab;
    case DASHBOARD_TAB_RESET:
      return 'edit';
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

function isFetchingSb(state = false, action) {
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
      return action.sbUser;
    case SB_IMAGE_UPDATED:
      return action.sbUser;
    case SB_LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
}

function sbChannels(state = [], action) {
  switch (action.type) {
    case SB_CHANNELS_RECEIVED:
      return action.sbChannels;
    case SB_CHANNEL_CREATED:
      return [ action.sbChannel, ...state ]
    case SB_LOGOUT_SUCCESS:
      return [];
    default:
      return state;
  }
}

function sbChannelsByUserId(state = {}, action) {
  switch (action.type) {
    case SB_CHANNELS_RECEIVED:
      return action.sbChannels.reduce((byUserId, channel) => {
        const { members } = channel;
        const { userId } = members.find(member => {
          return member.userId !== action.id.toString();
        });
        byUserId[userId] = channel;
        return byUserId;
      }, {});
    case SB_CHANNEL_CREATED:
      return { ...state, [action.otherUserId]: action.sbChannel };
    case SB_LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
}

function sbMessagesByUserId(state = {}, action) {
  switch (action.type) {
    case SB_MESSAGES_RECEIVED:
      return action.sbMessagesByUserId;
    case SB_MESSAGE_SENT: {
      const messageList = state[action.otherUserId];
      const newMessageList = [...messageList, action.sbMessage];
      return { ...state, [action.otherUserId]: newMessageList };
    }
    case SB_CHANNEL_CREATED:
      return { ...state, [action.otherUserId]: [] };
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
  isFetchingSb,
  sbUser,
  sbChannels,
  sbChannelsByUserId,
  sbMessagesByUserId,
});
