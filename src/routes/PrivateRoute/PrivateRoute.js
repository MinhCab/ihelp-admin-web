import React from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'

function PrivateRoute({ component: Component, ...rest }) {
    const location = useLocation()
    const isAuth = true; //phải tạo thêm context useAuth

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
