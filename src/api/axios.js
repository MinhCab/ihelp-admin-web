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
    baseURL: 'https://45.76.161.254:8443/ihelp',
})

const ACCESS_TOKEN = getToken().trim()

instance.defaults.headers.post['Content-Type'] = 'application/json'
instance.defaults.headers.common['Authorization'] = `Bearer ${ACCESS_TOKEN}`

export default instance