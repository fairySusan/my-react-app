import {CLEAR_PROFILE, SET_PROFILE} from '../constants';
export default {
  [SET_PROFILE] (state = null, action) {
    switch (action.type) {
      case SET_PROFILE:
      sessionStorage.setItem("token", JSON.stringify(action.token));
      sessionStorage.setItem('profile', JSON.stringify(action.profile));
      return {
        token: action.token,
        profile: action.profile
      };
      default:
      return state;
    }
  },
  [CLEAR_PROFILE] (state = null, action) {
    switch (action.type) {
      case CLEAR_PROFILE:
      sessionStorage.removeItem('userInfo');
      sessionStorage.removeItem('token');
      console.log('清除token成功')
      return null;
      default: 
      return state;
    }
  }
}
