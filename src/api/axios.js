import axios from 'axios'

// import file from '../assets/cert/reactCert.crt'

// const fs = require('fs')
// const https = require('https')
// let caCrt = '';
// try {
//   caCrt = fs.readFileSync(file)
// } catch (err) {
//   console.log('Make sure that the CA cert file is named ca.crt', err);
// }

// const httpsAgentCert = new https.Agent({ cert: caCrt, keepAlive: false });

const getToken = () => {
  let name = 'accessToken=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

const instance = axios.create({
  baseURL: 'https://45.76.161.254:8443/ihelp',
  // httpsAgent: httpsAgentCert
})

instance.defaults.headers.post['Content-Type'] = 'application/json'

instance.interceptors.request.use(
  (req) => {
    const ACCESS_TOKEN = getToken().trim()
    if(ACCESS_TOKEN) {
      req.headers['Authorization'] = 'Bearer ' + ACCESS_TOKEN
    }
    return req
  },
  (error) => {
    return Promise.reject(error)
  },
  { synchronous: true}
)

console.log('from axios instance: ' + getToken())

export default instance