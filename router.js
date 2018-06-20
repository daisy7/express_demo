var express=require('express');

var router=express.Router();

var path=require('path');

var handler=require('./handler.js');

router.get('/',handler.index);

router.get('/index',handler.index);

router.get('/submit',handler.submit);

router.get(/^\/details(\/.+)*$/,handler.details);

router.get('/detail/:id',handler.details);

router.get('/add',handler.add);

router.use('/resources',express.static(path.join(__dirname,'resources')));

module.exports=router;
