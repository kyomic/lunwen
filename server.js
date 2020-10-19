var Koa=require('koa'),
    router = require('koa-router')(),
    morgan = require('koa-morgan'),
    static = require('koa-static');

var app=new Koa();
/*应用ejs模板引擎*/

// logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

app.use(static(__dirname+'/dist'));
//配置post bodyparser的中间件
router.get('/',async (ctx)=>{
    await  ctx.render('index');
})

//接收post提交的数据
router.post('/doAdd',async (ctx)=>{

    console.log(ctx.request.body);
    ctx.body=ctx.request.body;  //获取表单提交的数据
})

app.use(router.routes());   /*启动路由*/
app.use(router.allowedMethods());

const PORT = process.env.PORT || 3001;
// 监听端口
app.listen(PORT, () => {
    console.log("服务器已启动，http://localhost:"+PORT);
})