let mongoose = require('mongoose');
let Schema = mongoose.Schema;
//创建类型模型
let NewsType = {
    title: String,//标题
    content: String,//内容
    newsType: Number,//1 最新动态 2 典型案例 3 通知公告,
    newsCover: String,//新闻封面图片
    isPublish:Number,//是否发布 0 未发布 1 已发布
    editTime: Date,//修改时间
}
let NewsModule = mongoose.model('News', new Schema(NewsType));
module.exports = NewsModule;