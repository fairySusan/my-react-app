import {CLEAR_PROFILE, SET_PROFILE} from '../constants';
export const clearProfile = () => ({
    type: CLEAR_PROFILE,
});
export const setProfile = (res) => ({
    type: SET_PROFILE,
    token: res.token,
    profile: res
});