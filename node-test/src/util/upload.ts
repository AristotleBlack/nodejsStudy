
import axios from 'axios'

export const upload = (path: string, ruleForm: any) => {
    let fileData = new FormData()
    for (let i in ruleForm) {
        fileData.append(i, ruleForm[i])
    }
    return axios.post(path, fileData, {
        headers: { 'content-type': "multipart/form-data" }
    })
}