import axios from 'axios'

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
    baseURL: 'http://45.76.161.254:8082/ihelp',
    auth: getToken
})

// axios.defaults.headers.common['Authorization'] = getToken;
axios.defaults.headers.post['Content-Type'] = 'application/json'

export default instance