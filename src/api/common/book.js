let Mock = require('mockjs');
let book = Mock.mock({
    'id|+1':1,
    'isbn':'@string("lower", 5, 20)', //一串随机字符串
    'name':'@character("upper")'
})
module.exports = book;
/*

'id|+1': 1,
        'isBoolean': '@boolean(10, 0, true)',//百分之百的true
        'naturalNumber': '@natural(1, 1000)', //大于等于零的整数
        'integer': '@integer(0)', //随机整数
        'float': '@float(1, 100, 3, 6)', //随机浮点数, 
        'character': '@character("upper")', //一个随机字符
        'string': '@string("lower", 5, 20)', //一串随机字符串
        'range': '@range(1, 10, 2)', //一个整形数组，步长为2
Book_id
Book_isbn
Book_name
Book_type
Book_publisher
Book_author
Book_intro
Book_price
Book_publishdate
Book_pic
Book_count
Book_createdate
Book_isnew
Book_isrecommend
Book_isdeleted
*/