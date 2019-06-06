import Mock from 'mockjs';
const Random = Mock.Random;
Mock.mock('http://127.0.0.1:3001/getMockData', 'get', {   // 第二个参数要么不要，要么小写
    'list|10': [{
        'id|+1':1,
        'name': Random.cname()
    }]
})