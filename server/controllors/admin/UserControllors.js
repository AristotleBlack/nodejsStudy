const UserService = require("../../service/admin/UserService")
const JWT = require("../../util/JWT")


const UserControllors = {
    login: async (req, res) => {
        let result = await UserService.login(req.body)
        if (result.length === 0) {
            res.send({
                'code': '-1',
                'msg': '用户或者密码不正确'
            })
        } else {
            let token = JWT.establish({
                _id: result[0]._id,
                name: result[0].name,
            }, "1h")
            res.header('authorization', token)
            res.send({
                ActionType: 'OK',
                data: {
                    id: result[0]._id,
                    name: result[0].name,
                    introduction: result[0].introduction ? result[0].introduction : '',
                    gender: result[0].gender ? result[0].gender : 0,
                    avater: result[0].avater ? result[0].avater : '',//头像
                    role: result[0].role//1 管理员，2操作员
                }
            })
        }
    },
    upload: async (req, res) => {
        let token = req.headers['authorization'].split(' ')[1]
        let { _id } = JWT.verify(token)
        let { name, gender, introduction } = req.body
        let filePath = req.file ? `images/uploads/${req.file.filename}` : ''
        await UserService.upload(
            {
                _id,
                name, introduction,
                gender: Number(gender),
                filePath
            }
        )
        if (filePath) {
            res.send({
                ActionType: 'OK',
                data: {
                    name, introduction,
                    gender: Number(gender),
                    avater: filePath
                }
            })
        } else {
            res.send({
                ActionType: 'OK',
                data: {
                    name, introduction,
                    gender: Number(gender),
                }
            })
        }
    },
    addUser: async (req, res) => {
        let { name, password, gender, role, introduction } = req.body
        let avater = req.file ? `images/uploads/${req.file.filename}` : ''
        await UserService.userAdd({ name, password, gender, role, introduction, avater })
        res.send({
            ActionType: 'OK'
        })
    },
    getList: async (req, res) => {
        let result = await UserService.getList({ _id: req.params.id })
        res.send({
            ActionType: "OK",
            data: result
        })
    },
    delList: async (req, res) => {
        let result = await UserService.delList({ _id: req.params.id })
        res.send({
            ActionType: 'OK'
        })
    },
    edit: async (req, res) => {
        let {_id,name,password,introduction,role} = req.body
        let result = await UserService.edit({ _id,name,password,introduction,role })
        res.send({
            ActionType:'OK'
        })
    }
}

module.exports = UserControllors