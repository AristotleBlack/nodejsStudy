let jsonwebtoken = require('jsonwebtoken')
let secretKey = 'ljp520wyt'
const JWT = {
    //创建一个token  sign(信息，秘钥，过期时间)
    establish(value, past) {
        return jsonwebtoken.sign(value, secretKey, {expiresIn:past})
    },
    //验证token是否过期
    verify(token) {
        try {
            return jsonwebtoken.verify(token, secretKey)
        } catch (e) {
            return false
        }
    }
}

module.exports = JWT