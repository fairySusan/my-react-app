import {CLEAR_PROFILE, SET_PROFILE, OPEN_USER_INFO, CLOSE_USER_INFO} from '../constants';
export default {
  profile (state = null, action) {
    switch (action.type) {
      case SET_PROFILE:
        sessionStorage.setItem("token", action.token);
        sessionStorage.setItem('profile', JSON.stringify(action.profile));
        return {
          token: action.token,
          profile: action.profile
        };
      case CLEAR_PROFILE:
        sessionStorage.removeItem('profile');
        sessionStorage.removeItem('token');
        return null;
      default:
      return state;
    }
  },
  showProfile (state = false, action) {
    switch (action.type) {
      case OPEN_USER_INFO:
        return true;
      case CLOSE_USER_INFO:
        return false;
      default:
        return false;
    }
  },
}
