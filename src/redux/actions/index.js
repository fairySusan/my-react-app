import {
    CLEAR_PROFILE,
    SET_PROFILE,
    OPEN_USER_INFO,
    CLOSE_USER_INFO,} from '../constants';
export const clearProfile = () => ({
    type: CLEAR_PROFILE,
});
export const setProfile = (res) => ({
    type: SET_PROFILE,
    token: res.token,
    profile: res
});
export const openUserInfo = () => ({
    type: OPEN_USER_INFO,
});
export const closeUserInfo = () => ({
    type: CLOSE_USER_INFO,
})