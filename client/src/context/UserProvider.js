import React, { useEffect, useState} from 'react'

import axios from 'axios'

export const UserContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('chat-app-current-user-token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function UserProvider(props){
    

       
    return(
        <UserContext.Provider
            value={{
                userAxios,
                
            }}
        >
        { props.children}
        </UserContext.Provider>
    )
}