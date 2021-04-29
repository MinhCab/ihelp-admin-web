import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://45.76.161.254:8082/ihelp/api/',
})

instance.defaults.headers.post['Content-Type'] = 'application/json'

export default instance