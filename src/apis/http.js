import axios from 'axios';
import baseUrl from '../local_config';
const http  = axios.create({
  baseURL: baseUrl,
  timeout: 30000,
  validateStatus(status) {
    return status < 500
  }
})
// 请求取消标识
const CancelToken = axios.CancelToken;
// 拦截请求
http.interceptors.request.use(config => {
  if (sessionStorage.token) {
    config.headers.Authorization = `JWT ${sessionStorage.token}`; // jwt 验证
  }

  // 对每个请求添加取消标识，便于页面跳转是取消请求
  const token = new CancelToken(c => {
    window.reqs.push(c);
  });
  config.cancelToken = token;
  return config;
}, err => {
  return Promise.reject(err);
});
// 拦截响应
http.interceptors.response.use(res => {
  const result = {};
  result.succeed = false;
  result.status = res.status;
  result.headers = res.headers; // response header
  result.data = res.data;
  return result;
}, err => {
  return Promise.reject(err);
})

export default http;