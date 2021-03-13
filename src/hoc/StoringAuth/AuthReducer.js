const authReducer = (state, action) => {
    switch(action.type) {
        case 'login':
            const {token, role} = action
            const expireAt = authResult.expiresIn * 1000 + new Date().getTime()
            document.cookie = 'accessToken=' + ''
    }
}