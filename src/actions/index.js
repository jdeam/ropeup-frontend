import { 
  DASHBOARD_TAB_RESET,
  TOKEN_CLEARED,
  fetchToken,
} from './window';
import {
  FETCHING_USER,
  USER_CLEARED,
  FETCHING_SCHEDULE,
  SCHEDULE_CLEARED,
  FETCHING_GYMS,
  GYMS_CLEARED,
  fetchUser,
  fetchSchedule,
  fetchGyms,
} from './user';
import {
  MATCHES_CLEARED,
  FETCHING_MATCHES,
  fetchMatches,
} from './matches';
import {
  SB_FETCHING_STARTED,
  sbLogin,
  sbGetChannels,
  sbGetMessages,
  sbRegisterAllChannelHandlers,
  sbLogout,
} from './sendbird';

export function clearAllUserInfo() {
  return (dispatch) => {
    dispatch({ type: TOKEN_CLEARED });
    dispatch({ type: USER_CLEARED });
    dispatch({ type: GYMS_CLEARED });
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
    dispatch({ type: FETCHING_GYMS });
    dispatch({ type: FETCHING_SCHEDULE });
    dispatch({ type: FETCHING_MATCHES });
    dispatch({ type: SB_FETCHING_STARTED });
    await dispatch(fetchUser());
    await dispatch(sbLogin());
    await dispatch(fetchGyms());
    await dispatch(fetchSchedule());
    await dispatch(sbGetChannels());
    await dispatch(fetchMatches());
    await dispatch(sbGetMessages());
    dispatch(sbRegisterAllChannelHandlers());
  };
}