import { combineReducers } from 'redux';
import * as window from './window';
import * as user from './user';
import * as matches from './matches';
import * as sendbird from './sendbird';

export default combineReducers({
  dashboardTabInView: window.dashboardTabInView,
  token: window.token,
  isFetchingUser: user.isFetchingUser,
  user: user.user,
  isFetchingSchedule: user.isFetchingSchedule,
  schedule: user.schedule,
  isFetchingGyms: user.isFetchingGyms,
  gyms: user.gyms,
  gymsById: user.gymsById,
  isFetchingMatches: matches.isFetchingMatches,
  matches: matches.matches,
  matchesByUsername: matches.matchesByUsername,
  sbIsFetching: sendbird.sbIsFetching,
  sbUser: sendbird.sbUser,
  sbChannels: sendbird.sbChannels,
  sbChannelsByUsername: sendbird.sbChannelsByUsername,
  sbMessagesByUsername: sendbird.sbMessagesByUsername,
  sbIsSending: sendbird.sbIsSending,
  sbNumUnread: sendbird.sbNumUnread,
  sbTypingStatusByUsername: sendbird.sbTypingStatusByUsername,
  // sbRefreshInterval: sendbird.sbRefreshInterval,
});