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
  isFetchingMatches: matches.isFetchingMatches,
  matches: matches.matches,
  matchesById: matches.matchesById,
  sbIsFetching: sendbird.sbIsFetching,
  sbUser: sendbird.sbUser,
  sbChannels: sendbird.sbChannels,
  sbChannelsByOtherUserId: sendbird.sbChannelsByOtherUserId,
  sbMessagesByOtherUserId: sendbird.sbMessagesByOtherUserId,
  sbIsSending: sendbird.sbIsSending,
  sbNumUnread: sendbird.sbNumUnread,
  sbTypingStatusByOtherUserId: sendbird.sbTypingStatusByOtherUserId,
  // sbRefreshInterval: sendbird.sbRefreshInterval,
});