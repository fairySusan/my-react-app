import Mock from 'mockjs';
const Random = Mock.Random;
Mock.mock('/getMockData', 'get', {   // 第二个参数要么不要，要么小写
    'list|10': [{
        'id|+1':1,
        'name': Random.cname()
    }]
})