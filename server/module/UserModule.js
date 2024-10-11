let mongoose = require('mongoose')
//schema对集合的字段类型进行限制
let Scheme = mongoose.Schema
//创建类型
const UserType = {
    name:String,
    password:String,
    gender:Number,
    introduction:String,//简介
    avater:String,//头像
    role:Number//1 管理员，2操作员
}
//创建一个user模块，在MongoDB创建一个users集合 返回一个model对象
let model = mongoose.model('user',new Scheme(UserType))
module.exports = model