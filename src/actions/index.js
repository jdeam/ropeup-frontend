import axios from 'axios';
const BaseURL = 'http://localhost:8080';

export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export function login(email, password) {
  return async (dispatch) => {
    const loginBody = { email, password };
    const response = await axios.post(`${BaseURL}/auth/login`, loginBody);
    const token = response.headers.auth.split(' ')[1];
    const { user_id } = response.data.claim;
    if (user_id) dispatch({ type: USER_LOGGED_IN, user_id });
    localStorage.setItem('token', JSON.stringify(token));
  }
}
export function signup(email, password) {
  return async (dispatch) => {
    const signupBody = { email, password };
    const response = await axios.post(`${BaseURL}/auth/signup`, signupBody);
    const token = response.headers.auth.split(' ')[1];
    const { user_id } = response.data.claim;
    if (user_id) dispatch({ type: USER_LOGGED_IN, user_id });
    localStorage.setItem('token', JSON.stringify(token));
  }
}
