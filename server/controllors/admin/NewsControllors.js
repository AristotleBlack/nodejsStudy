let NewsService = require('../../service/admin/NewsService');
const  NewsControllors = {
    addNews:async (req,res)=>{  
        let {title,content,newsType,isPublish} = req.body;
        let newsCover = req.file?`images/uploads/${req.file.filename}` : "";
        await NewsService.addNews({title,
            content,
            newsType:Number(newsType),
            isPublish:Number(isPublish),
            editTime:new Date(),
            newsCover});
        res.send({
            ActionType:"OK"
        })
    },
    editNews:async (req,res)=>{  
        let {title,content,newsType,isPublish} = req.body;
        let newsCover = req.file?`images/uploads/${req.file.filename}` : "";
        let id = req.params.id;
        await NewsService.editNews({_id:id,
            title,
            content,
            newsType:Number(newsType),
            isPublish:Number(isPublish),
            editTime:new Date(),
            newsCover
        });
        res.send({
            ActionType:"OK"
        })
    },
    getList:async (req,res)=>{  
      let result =  await NewsService.getList({id:req.params.id});
        res.send({
            ActionType:"OK",
            data:result
        })
    },
    delList:async (req,res)=>{  
        let id = req.params.id;
        await NewsService.delList({_id:id});
        res.send({
            ActionType:"OK",
            data:{
                msg:'删除成功'
            }
        })
    },
    // 点击发布按钮后，修改isPublish状态
    putList:async (req,res)=>{  
       let id = req.params.id;
       let isPublish = req.body.isPublish;
       await NewsService.putList({_id:id,isPublish:Number(isPublish),editTime:new Date()})
       res.send({
            ActionType:'OK',
            data:{
                msg:'发布成功'
            }
       })
    },
}
module.exports = NewsControllors