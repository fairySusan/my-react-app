import {CLEAR_PROFILE, SET_PROFILE} from '../constants';
export default {
  profile (state = null, action) {
    switch (action.type) {
      case SET_PROFILE:
        sessionStorage.setItem("token", JSON.stringify(action.token));
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
}
