import React from 'react'

export const StoreContext = React.createContext(null)

export default ({children}) => {
    const [eventDetails, setEventDetails] = React.useState({})
    const [serviceDetails, setServiceDetails] = React.useState({})


    const store = {
        eventDetails: [eventDetails, setEventDetails],
        serviceDetails: [serviceDetails, setServiceDetails]
    }

    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    )
}