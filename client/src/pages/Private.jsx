import React, { useState, useEffect, useRef, useContext, } from 'react'

import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

import { useNavigate } from 'react-router';
import { allUsersRoute, host } from '../utils/APIRoutes';
import { UserContext } from "../context/UserProvider";
import Contacts from '../components/Contacts'
import Welcome from '../components/Welcome'
import ChatContainer from '../components/ChatContainer'
import { io } from 'socket.io-client'
export default function Chat() {
    const { userAxios, } = useContext(UserContext)
	const [currentUser, setCurrentUser] = useState([]);
    const navigate = useNavigate()
    const [contacts, setContacts] = useState([])
	const [contactss, setContactss] = useState([])
    const [currentChat, setCurrentChat] = useState([undefined])
	const socket= useRef()
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
		if (currentUser.length !== 0) {
			socket.current = io(host)
			socket.current.emit('add-user', currentUser._id)
		}
	}, [currentUser])

    useEffect(() => {

        const getContacts = async () => {
            if (currentUser.length !== 0) {
                if (currentUser.isAvatarImageSet) {
                    const data = await userAxios.get(`${allUsersRoute}/${currentUser._id}`)
					delete Object.assign(data.data, {chat: data.data.username})['username'];
                    setContacts(data.data)
                } else {
                    navigate('/setavatar')
                }
            }
        }
        getContacts()
    }, [currentUser])
		let handleChatChange = (chat) => {
			
			
			setCurrentChat(chat)
		}
	
    return (
		<Container>
			<div className='container'>
				<Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
				{
					currentChat.length === 1 ? (
						<Welcome currentUser={currentUser} />
					) : (
						<ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
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
	