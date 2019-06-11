import {CLEAR_PROFILE, SET_PROFILE, OPEN_USER_INFO, CLOSE_USER_INFO, OPEN_USER_INFO_MODAL, CLOSE_USER_INFO_MODAL} from '../constants';
export default {
  profile (state = null, action) {
    switch (action.type) {
      case SET_PROFILE:
        localStorage.setItem("token", JSON.stringify(action.token));
        localStorage.setItem('profile', JSON.stringify(action.profile));
        return {
          token: action.token,
          profile: action.profile
        };
      case CLEAR_PROFILE:
        localStorage.removeItem('profile');
        localStorage.removeItem('token');
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
  showUserInfoModal (state = false, action) {
    switch (action.type) {
      case OPEN_USER_INFO_MODAL:
        return true;
      case CLOSE_USER_INFO_MODAL:
        return false;
      default:
        return false;
    }
  }
}
