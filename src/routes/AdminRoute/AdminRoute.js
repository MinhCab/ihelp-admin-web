import React from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'
import { useAuth } from '../../hoc/StoringAuth/AuthContext';

function AdminRoute({ component: Component, ...rest }) {
    const { accessToken, role } = useAuth()
    const location = useLocation()

    let isAuth = accessToken ? true : false
    let isAdmin = (role.id === 'admin') ? true : false

    return (
        <Route 
            {...rest}
            render={(props) => {
                return(
                    (isAuth && isAdmin) ? (<Component {...props}/>) : (<Redirect to={{pathname: '/home', state: { from: location }}}/>)
                )
            }}
        />
    )
}

export default AdminRoute
