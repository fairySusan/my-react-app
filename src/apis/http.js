import axios from 'axios';
import baseUrl from '../local_config';
const http  = axios.create({
  baseURL: '',
  timeout: 30000,
  validateStatus(status) {
    return status < 500
  }
})

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