//主模块：负责启动服务

//1.加载express模块
var express=require('express');

//加载config模块
var config=require('./config.js');
//2.创建app对象
var app=express();

//3.注册路由
var router=require('./router.js');

//设置模板引擎
app.engine('html', require('ejs').renderFile);

app.set(config.viewPath, __dirname + '/'+config.viewPath);

app.use('/',router);

//4.启动服务
app.listen(config.port,function(){
	console.log('http://localhost:'+config.port);
});
