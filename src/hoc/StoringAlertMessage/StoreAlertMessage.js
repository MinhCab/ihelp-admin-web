import React, { useContext } from 'react'
import { createContext } from 'react'

const AlertContext = createContext()

export function useAlert(){
    return useContext(AlertContext)
}

function AlertLogic() {
    const [message, setMessage] = React.useState({type: 'success', message: 'Test context', isOpen: true})

    const receiveMessage = (value) => {
        setMessage(value)
        console.log(value)
    }

    return { message, receiveMessage }
}

function StoreAlertMessage(props) {
    const{children} = props
    const setAlert = AlertLogic()
    return (
       <AlertContext.Provider value={setAlert}>{children}</AlertContext.Provider>
    )
}

export default StoreAlertMessage
