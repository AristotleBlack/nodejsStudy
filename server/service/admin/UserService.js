const model = require("../../module/UserModule")


const UserService = {
    login: async ({ name, password }) => {
        return model.find({
            name,
            password
        })
    },
    upload: async ({ _id, name, introduction, gender, filePath }) => {
        if (filePath) {
            return model.updateOne({
                _id
            }, {
                name,
                gender,
                introduction,
                avater: filePath
            })
        } else {
            return model.updateOne({
                _id
            }, {
                name,
                gender,
                introduction
            })
        }
    },
    userAdd: async ({ name, password, gender, role, introduction, avater }) => {
        return model.create({
            name, password, gender, role, introduction, avater
        })
    },
    getList:async ({_id})=>{
        return _id?model.find({_id},['name','introduction','password','role']): model.find({},['name','gender','introduction','avater','role'])
    },
    delList:async ({_id})=>{
        return model.deleteOne({_id})
    },
    edit:async({ _id,name,password,introduction,role})=>{
       return model.findOneAndUpdate({_id},{
            name,password,introduction,role
        })
    }

}

module.exports = UserService