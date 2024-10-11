let News = require('../../module/NewsModule');
const NewsService = {
    addNews: async ({title,content,newsType,isPublish,newsCover,editTime}) => {
        return await News.create({title,content,newsType,isPublish,newsCover,editTime});
    },
    getList: async ({id}) => {
        return await id? News.find({_id:id}).sort({editTime:-1}) : News.find({}).sort({editTime:-1});
    },
    delList: async ({_id}) => {
        return await News.deleteOne({_id});
    },
    putList:async ({_id,isPublish,editTime})=>{
        return await News.updateOne({_id},{isPublish,editTime})
    },
    editNews: async ({_id,title,content,newsType,isPublish,newsCover,editTime}) => {
        return await newsCover? News.updateOne({_id},{title,content,newsType,isPublish,newsCover,editTime}) : News.updateOne({_id},{title,content,newsType,isPublish,editTime});
    }
}
module.exports = NewsService;