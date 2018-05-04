import {
  DASHBOARD_TAB_SWITCHED,
  DASHBOARD_TAB_RESET,
  TOKEN_RECEIVED,
  TOKEN_CLEARED,
} from '../actions/window';

export function dashboardTabInView(state = 'edit', action) {
  switch (action.type) {
    case DASHBOARD_TAB_SWITCHED:
      return action.tab;
    case DASHBOARD_TAB_RESET:
      return 'edit';
    default:
      return state;
  }
}

export function token(state = '', action) {
  switch (action.type) {
    case TOKEN_RECEIVED:
      return action.token;
    case TOKEN_CLEARED:
      return '';
    default:
      return state;
  }
}