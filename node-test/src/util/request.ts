import axios from 'axios'
axios.interceptors.request.use(config => {
    let token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

axios.interceptors.response.use(req => {
    let { authorization } = req.headers
    authorization && localStorage.setItem('token', authorization)
    return req
}, err => {
   if(err.response.status==401){
        window.location.href = '/'
   }
})