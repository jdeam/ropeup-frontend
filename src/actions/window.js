export const DASHBOARD_TAB_SWITCHED = 'DASHBOARD_TAB_SWITCHED';
export const DASHBOARD_TAB_RESET = 'DASHBOARD_TAB_RESET';

export function switchDashboardTab(tab) {
  return (dispatch, getState) => {
    const {
      dashboardTabInView
    } = getState();
    if (dashboardTabInView !== tab) {
      dispatch({
        type: DASHBOARD_TAB_SWITCHED,
        tab
      });
    }
  };
}

export const TOKEN_RECEIVED = 'TOKEN_RECEIVED';
export const TOKEN_CLEARED = 'TOKEN_CLEARED';

export function fetchToken() {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (token) dispatch({
      type: TOKEN_RECEIVED,
      token
    });
  };
}