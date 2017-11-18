var mongodb = require('mongodb');
var db = require('./db');
var async = require('async');
const DB_URL = 'mongodb://127.0.0.1:27017/sms';
const STUDENTS_COL = 'students';
const CITIES_COL = 'cities';
const MAJORS_COL = 'majors';
//index
module.exports.index = function (req, res) {
  res.render('index');
}
//students
module.exports.students = function (req, res) {
  db.findAll(STUDENTS_COL, function (err, docs) {
    if (err) {
      throw err;
    }
    // console.log(docs);
    res.render('students', {
      list: docs
    });
  })
}
//详情页
module.exports.info = function (req, res) {
  var _id = db.ml_ObjectId(req.query._id);
  db.findOne(STUDENTS_COL, _id, function (err, doc) {
    if (err) {
      throw err;
    }
    console.log(doc);
    res.render('info', {
      item: doc
    });
  })
}
//add 显示
module.exports.showAdd = function (req, res) {
  //cities
  db.findAll(CITIES_COL, function (err, data_cities) {
    if (err) {
      throw err;
    }
    //majors
    db.findAll(MAJORS_COL, function (err, data_majors) {
      if (err) {
        throw err;
      }
      //渲染
      res.render('add', {
        cities: data_cities,
        majors: data_majors
      });
    })
  })
}
//add 提交
module.exports.submitAdd = function (req, res) {
  // 获取对象
  // console.log(req.body);
  var obj = {
    sno: req.body.sno,
    sname: req.body.sname,
    sgender: req.body.sgender == 'M' ? '男' : '女',
    sbirthday: req.body.sbirthday,
    sphone: req.body.sphone,
    saddr: req.body.saddr,
    smajor: req.body.smajor
  }
  //插入数据库
  db.insertOne(STUDENTS_COL, obj, function (err) {
    if ((err)) {
      throw err;
    }
    //重定向
    res.redirect('/students');
  })
}
//编辑页面
module.exports.showEdit =function (req,res) {
  //方法 async.parallel( tasks , 回调 )
  async.parallel({
    one:function(callback){
      db.findAll(CITIES_COL,function (err,data_cities) {
        callback(err,data_cities);
      })
    },
    two:function (callback) {
      db.findAll(MAJORS_COL,function (err,data_majors) {
        callback(err,data_majors);
      })
    },
    three:function (callback) {
      var _id =db.ml_ObjectId(req.query._id);
      db.findOne(STUDENTS_COL,_id,function (err,doc) {
        callback(err,doc);
      })
    }
  },function (err,result) {
    res.render('edit',{cities:result.one,majors:result.two,item:result.three})
  })
}
//提交编辑
module.exports.submitEdit =function (req,res) {
  var  obj = {
    sno: req.body.sno,
    sname:req.body.sname,
    sgender:req.body.sgender == 'M' ? '男' : '女',
    sbirthday:req.body.sbirthday, 
    sphone:req.body.sphone,
    saddr:req.body.saddr,
    smajor:req.body.smajor
  }
  // post方式获取_id
  var _id =db.ml_ObjectId(req.body._id);
  db.updateOne(STUDENTS_COL,_id,obj,function (err) {
    if (err) {
      throw err;
    }
    res.redirect('/students');
  })
}
//detele
module.exports.delete =function (req,res) {
  var _id =db.ml_ObjectId(req.query._id);
  db.deleteOne(STUDENTS_COL,_id,function (err) {
    if(err){
      throw err;
    }
    res.redirect('/students');
  })
}
