let Mock = require('mockjs');
let bookRule = require('../rule/book.js');
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

let books = Mock.mock({
    'list|1-100': [bookRule]
})

let api = {
    // 支持值为 Object 和 Array
    'GET /api/user/list': (req, res) =>{
        res.send({
            status:200, data:basicData
        })
    },
    'GET /api/web/book/suggest':(req,res)=>{
        res.send({
            status:'200', data:books
        })
    },
    'POST /api/web/user/login':(req,res)=>{
        let body = null;
        try{
            body = req.body;
        }catch(e){}
        if( body){
            if( body.user =='admin' && body.pass =='admin'){
                res.send({
                    status: 200,
                    data:{
                        user_id:111,token:'abc',level:0,nick_name:'坤坤'
                    }
                });
                return;
            }
        }
        res.send({
            status: 400,
            data:null
        });
    }
}

module.exports = api;