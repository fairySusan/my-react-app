import axios from 'axios';
import baseUrl from '../local_config';
const http  = axios.create({
  baseURL: baseUrl,
  timeout: 30000,
  validateStatus(status) {
    return status < 500
  },
  withCredentials: true // 允许携带cookie
})
// 请求取消标识
const CancelToken = axios.CancelToken;
// 拦截请求
http.interceptors.request.use(config => {
  if (sessionStorage.token) {
    config.headers.Authorization = sessionStorage.token; // jwt 验证
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
  if (res.status >= 200 && res.status <= 300) {
    result.succeed = true;
  }
  if (res.status >= 400 && res.status <= 500) {
    result.message = res.data.message;
  }
  return result;
}, err => {
  return Promise.reject(err);
})

export default http;