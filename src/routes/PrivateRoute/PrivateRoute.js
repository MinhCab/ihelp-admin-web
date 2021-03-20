import React from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'
import { useAuth } from '../../hoc/StoringAuth/AuthContext';

function PrivateRoute({ component: Component, ...rest }) {
    const {accessToken} = useAuth()
    const location = useLocation()
    console.log('from private route: ' + accessToken)
    let isAuth = accessToken ? true : false

    return (
        <Route 
            {...rest}
            render={(props) => {
                return(
                    isAuth ? (<Component {...props}/>) : (<Redirect to={{pathname: '/login', state: { from: location }}}/>)
                )
            }}
        />
    )
}

export default PrivateRoute
