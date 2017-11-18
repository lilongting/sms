var express = require('express');
var handler = require('./handler');
//获取router
var router = express.Router();
//路由
router.get('/', handler.index);
router.get('/idnex', handler.index);
router.get('/students', handler.students);
router.get('/info', handler.info);
// add
router.get('/add', handler.showAdd);
router.post('/add', handler.submitAdd);
//edit
router.get('/edit', handler.showEdit);
router.post('/edit', handler.submitEdit);
//delate
router.get('/delete', handler.delete);
//错误
// router.use('/', function (req, res, next) {
//   res.send('你找不到了吧,啦啦啦');
//   // console.log('你找不到了吧,啦啦啦');

//   // next();
// })
//注意暴露router
module.exports = router;