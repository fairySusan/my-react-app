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
/**
 * 删除商铺
 */
export const deleteShop = (id) => {
    return http.get(`/shopping/deleteRestaurants?id=${id}`)
}
/**
 * 更新商铺
 */
export const modifyShop = (params) => {
    return http.post(`/shopping/modifyRestaurants`, params)
}
/**
 * 添加商铺食品分类
 */
export const addMenu = (params) => {
    return http.post('/shopping/restaurants/addMenu', params);
}
/**
 * 获取商铺食品分类
 */
export const getMenu = (restaurant_id) => {
    return http.get(`/shopping/restaurants/getMenu?restaurant_id=${restaurant_id}`)
}
/**
 * 添加食品
 */
export const addFood = (params) => {
    return http.post('/shopping/restaurants/addFood', params)
}
/**
 * 添加获取食品
 */
export const getFood = () => {
    return http.get(`/shopping/restaurants/getFood?time=${new Date().getTime()}`)
}