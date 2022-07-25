import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router';
import axios from 'axios'

export const UserContext = React.createContext()
const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('chat-app-current-user-token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

function logout(){
    localStorage.removeItem('chat-app-current-user')
    localStorage.removeItem('chat-app-current-user-token')
    window.location.reload(false);
}

export default function UserProvider(props){
    return(
        <UserContext.Provider
            value={{
                userAxios,
                logout
            }}
        >
        { props.children}
        </UserContext.Provider>
    )
}