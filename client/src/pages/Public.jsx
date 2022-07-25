import React, { useState, useEffect, useRef, useContext, } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router';
import { allUsersRoute, host, getServerRoute } from '../utils/APIRoutes';
import { UserContext } from "../context/UserProvider";
import ServerContainer from '../components/ServerContainer'
import Servers from '../components/Servers'
import Contacts from '../components/Contacts'
import Welcome from '../components/Welcome'
import ChatContainer from '../components/ChatContainer'
import { io } from 'socket.io-client'
export default function Chat() {
    const { userAxios, } = useContext(UserContext)
	const [currentUser, setCurrentUser] = useState([]);
    const navigate = useNavigate()
    const [contacts, setContacts] = useState([])
    const [currentServer, setCurrentServer] = useState([undefined])
    const [servers, setServers] = useState([])
	const socket= useRef()
    const username = currentUser.username
    const room = 'room'
    useEffect(() => {
		const CheckIfLoggedIn = async () => {
			if (!localStorage.getItem('chat-app-current-user')) {
				navigate('/login')
			} else {
				setCurrentUser(await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)))
			}
		}
        CheckIfLoggedIn()
    }, [])

    useEffect(() => {
		const getServers = async () => {
			if(currentUser.length !== 0) {
				if(currentUser.isAvatarImageSet) {
					const data = await userAxios.get(`${getServerRoute}`)
					setServers(data.data)
				}
			}
		}
		getServers()
    }, [currentUser])
		let handleServerChange = (server) => {
			
			setCurrentServer(server)
			
		}
    return (
		<Container>
			<div className='container'>
				<Servers contacts={contacts} currentUser={currentUser} changeServer={handleServerChange} servers={servers}/>
				{
					currentServer.length === 1 ? (
						<Welcome currentUser={currentUser} />
					) : (
						<ServerContainer  currentChat={currentServer} currentUser={currentUser} socket={socket} />
					)
				}
			</div>
		</Container>
    )
}

const Container = styled.div`
.container {
			height: 85vh;
			width: 85vw;
			background-color: #83a8e4;
			display:grid;
			
			grid-template-columns: 25% 75%;
			@media screen and (min-width: 720px) and (max-width: 1080px) {
				grid-template-columns: 35% 65%;
			}
}
.contacts-container {
    background-color: beige;
}`