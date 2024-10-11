var express = require('express');
const UserControllors = require('../../controllors/admin/UserControllors');
const NewsControllors = require('../../controllors/admin/NewsControllors');
var UserRouter = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'public/images/uploads/' })

/* GET home page. */
UserRouter.post('/adminapi/user/login', UserControllors.login)
UserRouter.post('/adminapi/user/edit', UserControllors.edit)
UserRouter.post('/adminapi/user/upload', upload.single('file'), UserControllors.upload)
UserRouter.post('/adminapi/user/addUser', upload.single('file'), UserControllors.addUser)
UserRouter.get('/adminapi/user/list', UserControllors.getList)
UserRouter.get('/adminapi/user/list/:id', UserControllors.getList)
UserRouter.delete('/adminapi/user/list/:id', UserControllors.delList)
//新闻
UserRouter.post('/adminapi/user/addNews',upload.single('file'), NewsControllors.addNews)
UserRouter.post('/adminapi/user/editNews/:id',upload.single('file'), NewsControllors.editNews)
UserRouter.get('/adminapi/news/list', NewsControllors.getList)
UserRouter.get('/adminapi/news/list/:id', NewsControllors.getList)
UserRouter.delete('/adminapi/news/list/:id', NewsControllors.delList)
//是否发布
UserRouter.put('/adminapi/news/list/:id', NewsControllors.putList)


module.exports = UserRouter;
