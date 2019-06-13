import Mock from 'mockjs';
const Random = Mock.Random;
Mock.mock('http://127.0.0.1:3000/getMockData', 'get', {   // 第二个参数要么不要，要么小写
    'list|10': [{
        'id|+1':1,
        'name': Random.cname()
    }]
})

Mock.mock('http://127.0.0.1:3000/mock/usermanage/getUserList', {
    'list|25': [{
        'id|+1':1,
        'name': Random.cname(),
        'position': '销售',
        'acount': Random.word(),
        'acount_state': Random.boolean(), // true=> 正常 false=>已冻结
        'role': '超级管理员',
    }]
})