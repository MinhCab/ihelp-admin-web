import React, { createContext, useContext, useState } from 'react'

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

function useAuthProvider() {
    const [user, setUser] = useState(null)
    const [accessToken, setAccessToken] = useState(getCookie('accessToken'))
    console.log('From authContext - token: ' + accessToken)
    console.log('From authContext - user: ' + user)
    
    return {user, setUser, accessToken, setAccessToken}
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
