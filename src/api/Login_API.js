import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://45.76.161.254:8082/ihelp/login'
})

export default instance