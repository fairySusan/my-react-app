import http from './http';

/**
 *@params {*} username 用户名
 *@params {*} password 密码
 */
export const login = (params) => {
    return http.post('/admin/login', params);
}
/**
 *获取商铺列表
 */
export const getShopList = () => {
    return http.get(`/shopping/restaurants?time=${new Date().getTime()}`)
}
/**
 * 添加商铺
 */
export const addShop = (params) => {
    return http.post('/shopping/addRestaurants', params)
}