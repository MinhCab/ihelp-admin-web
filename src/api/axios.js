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

const refreshAccessToken = async () => {
  instance.post('/refreshtoken', {
    headers: {
      isRefreshToken: 'true'
    }
  }).then(res => {
    console.log(res.data)
    return res.data.accessToken
  })
}

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

instance.interceptors.response.use(
  (req) => {
    return req;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.response.data.cause.includes('io.jsonwebtoken.ExpiredJwtException')) {
      originalRequest._retry = true;
      const access_token = await refreshAccessToken();
      document.cookie = 'accessToken=' + access_token
      instance.defaults.headers.common["Authorization"] = "Bearer " + access_token;
      return instance(originalRequest);
    }
    return Promise.reject(error);
  }
);

console.log('from axios instance: ' + getToken())

export default instance