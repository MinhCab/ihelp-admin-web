import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from '../../api/axios'

const AuthContext = createContext()

export function useAuth(){
    return useContext(AuthContext)
} 

function getCookie(cname) {
    let name = cname + '=';
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

const useAuthProvider = () => {
    const [user, setUser] = useState({})
    const [role, setRole] = useState({})
    const [fcmToken, setFcmToken] = useState('')
    const [accessToken, setAccessToken] = useState(getCookie('accessToken'))

    const loadInfo = async() => {
      await axios
        .get("/accounts/" + getCookie("userEmail").trim())
        .then((res) => {
          setUser(res.data);
          setRole(res.data.role);
        })
        .catch((err) => {
          // console.log("Error from AuthContext: " + err.message);
        });
    }

    useEffect(() => {
      loadInfo()
    }, [])

    return {user, setUser, accessToken, setAccessToken, role, setRole, loadInfo, fcmToken, setFcmToken }
}

function AuthProvider(props) {
    const {children} = props

    const auth = useAuthProvider()

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
