let Mock = require('mockjs');
let basicData = Mock.mock({
    'list|1-100': [{
        'id|+1': 1,
        'isBoolean': '@boolean(10, 0, true)',//百分之百的true
        'naturalNumber': '@natural(1, 1000)', //大于等于零的整数
        'integer': '@integer(0)', //随机整数
        'float': '@float(1, 100, 3, 6)', //随机浮点数, 
        'character': '@character("upper")', //一个随机字符
        'string': '@string("lower", 5, 20)', //一串随机字符串
        'range': '@range(1, 10, 2)', //一个整形数组，步长为2
    }]
});

let api = {
    // 支持值为 Object 和 Array
    'GET /api/user/list': (req, res) =>{
        res.send({
            status:'ok', data:basicData
        })
    },
}

module.exports = api;