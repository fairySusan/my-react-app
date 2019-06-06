import http from './http';
export const getMockData = () => {
    return http.get('/getMockData',);
}

/**
 *@params {*} username 用户名
 *@params {*} password 密码
 */
export const login = (params) => {
    return http.post('/login', params);
}
