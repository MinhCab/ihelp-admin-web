import React from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'
import { useAuth } from '../../hoc/StoringAuth/AuthContext';

function PublicRoute({ component: Component, restricted, ...rest }) {
    const {accessToken} = useAuth()
    const location = useLocation()
    let isAuth = accessToken ? true : false

    return (
        <Route 
            {...rest}
            render={(props) => {
                return(
                    (isAuth && restricted) ? (<Redirect to={{pathname: '/home/dashboard', state: { from: location }}}/>) : (<Component {...props}/>)
                )
            }}
        />
    )
}

export default PublicRoute
