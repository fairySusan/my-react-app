const isProd = process.env.NODE_ENV === 'production';
let baseUrl = 'http://127.0.0.1:3000';
if (isProd) {
    baseUrl = 'http://127.0.0.1:3000';
}
export default baseUrl;