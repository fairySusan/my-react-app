import http from './http';
export const getMockData = () => {
    return http.get('/getMockData',);
}