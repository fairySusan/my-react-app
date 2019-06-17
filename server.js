var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
// 跨域设置
app.all('*', function (req, res, next) {
    res.append("Access-Control-Allow-Credentials", true)
    res.append("Access-Control-Allow-Origin", "http://localhost:3009")
    res.append("Access-Control-Allow-Headers", ["X-Requested-With","Content-Type","Authorization"])
    res.append("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
    res.append("X-Powered-By", ' 3.2.1')
    res.append("Content-Type", "application/json;charset=utf-8")
    next()
})
/**
 * 登录
 */
app.post('/login',(req, res) => {
    const result = {
        username: req.body.username,
        role: 'manager',
        token: '10011'
    }
    res.send(result);
})
var server = app.listen(3000,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port);
})