var mongodb = require('mongodb');
const DB_URL = 'mongodb://127.0.0.1:27017/sms';

function ml_conectDB(callback) {
  var mc = mongodb.MongoClient;
  var url = DB_URL;
  mc.connect(url, function (err, db) {
    if (err) {
      throw err;
    }
    callback(db);
  })
}
//查询全部
module.exports.findAll = function (collectionName, callback) {
  ml_conectDB(function (db) {

    db.collection(collectionName).find().toArray(function (err, docs) {
      db.close();
      callback(err, docs);
    })
  })
};
//查询单条
module.exports.findOne = function (collectionName, _id, callback) {
  ml_conectDB(function (db) {
    db.collection(collectionName).findOne({_id}, function (err, doc) {
      db.close();
      callback(err, doc);
    });
  });
}
//字符串=>objectId
module.exports.ml_ObjectId = function (idStr) {
  return mongodb.ObjectId(idStr);
}
//插入单条数据
/**
 * 
 * @param {*} collectionName 
 * @param {*} obj 
 * @param {*} callback 
 * 插入单条数据
 */
module.exports.insertOne = function (collectionName, obj, callback) {
  ml_conectDB(function (db) {
    db.collection(collectionName).insertOne(obj, function (err) {
      db.close();
      callback(err);
    })
  })
}
//更新数据
/**
 * 
 * @param {*} collectionName 
 * @param {*} _id 
 * @param {*} obj 
 * @param {*} callback 
 */
module.exports.updateOne =function (collectionName,_id,obj,callback) {
  ml_conectDB(function (db) {
    db.collection(collectionName).updateOne({_id},obj,function (err) {
      db.close();
      callback(err);
    })
  })
}
//删除数据
module.exports.deleteOne =function (collectionName,_id,callback) {
  ml_conectDB(function (db) {
    db.collection(collectionName).deleteOne({_id},function (err) {
      db.close();
      callback(err);
    })
  })
}