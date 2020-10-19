module.exports = {
	'id|+1':1,
    'isbn':'ISBN' + '@character("upper")',
    'name':'@character("upper")',
    'type':function(){
    	var types = ['少儿','青年'];
    	var rnd = Math.floor(Math.random()*types.length)
    	return types[rnd]
    }(),
    'publisher':'少儿出版社',
    'author':'@character("upper")',
    'intro':'说明说明说明',
    'price':'@natural(1, 1000)', //大于等于零的整数
    'publishdate':'2020/10/19',
    'pic':'',
    'count':'@natural(1, 1000)', //大于等于零的整数
    'isnew':true,
    'isrecommend':true,
    'isdeleted':false
};