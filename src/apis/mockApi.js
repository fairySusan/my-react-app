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
export const getShopList = (id) => {
    return http.get(`/shopping/restaurants?id=${id}`)
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
 * 查询商铺名称
 */
export const searchShopNames = (name) => {
    return http.get(`/shopping/searchRestaurants?name=${name}`)
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
 * 获取食品
 */
export const getFood = (restaurant_id) => {
    return http.get(`/shopping/restaurants/getFood?restaurant_id=${restaurant_id}`)
}
/**
 * 修改食品
 */
export const modifyFood = (params) => {
    return http.post('/shopping/restaurants/modifyFood', params)
}
/**
 * 删除食品
 */
export const deleteFood = (foodId, categoryId) => {
    return http.get(`/shopping/restaurants/deleteFood?foodId=${foodId}&categoryId=${categoryId}`)
}