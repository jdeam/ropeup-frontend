import axios from 'axios';
const BaseURL = 'http://localhost:8080';

export const USER_INFO_RECEIVED = 'USER_INFO_RECEIVED';
export function fetchUserInfo(id) {
  return async (dispatch) => {
    const response = await axios.get(`${BaseURL}/users/${id}`);
    const user = response.data.user;
    dispatch({
      type: USER_INFO_RECEIVED,
      user
    });
  };
}
