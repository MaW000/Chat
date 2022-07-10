import React, {useState, useEffect, useRef, useContext} from 'react'
import styled from 'styled-components'
import { sendMessageServerRoute, getMessagesRoute, sendMessageRoute,host } from '../utils/APIRoutes'
import ChatInput from './ChatInput'
import { io } from 'socket.io-client'
import { UserContext } from "../context/UserProvider";
export default function ChatContainer({currentChat, currentUser, socket}) {
  const { userAxios } = useContext(UserContext)
  const [messages, setMessages] = useState([])
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const scrollRef = useRef()
  console.log([currentChat, currentUser, socket])


  useEffect(() => {
    const getMessages = async() => {
        const res = await userAxios.post(getMessagesRoute, {
            from: currentUser._id,
            to: currentChat._id
        })
        setMessages(res.data)
    }
    if (currentChat) {getMessages()}
  }, [currentChat])
  
  useEffect(() => {
    let username = currentUser.username
    let room = currentChat.server
		if (currentUser.length !== 0) {
			socket.current = io(host)
			socket.current.emit('joinRoom', ({username, room}))
		}
	}, [currentUser])
  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    
    

    await userAxios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg});
    setMessages(msgs)
  };
  
  return (
    <Container>
        <div className="chat-header">
            <div className="user-details">
                <div className="avatar">
                    <img src={`data:image/png;base64,${currentChat.avatarImage}`} alt="avatar"/>
                </div>
                <div className="username">
                    <h3>{currentChat.server}</h3>
                </div>
            </div>
        </div>
        <div className='chat-messages'>
            {
                messages && messages.map((message, index) => {
                    return (
                        <div key={index} ref={scrollRef}>
                            <div className={`message ${message.fromSelf ? "sended" : "received"}`}>
                                <div className='content'>
                                    <p>
                                        {message.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        <ChatInput handleSendMsg={handleSendMsg} messages={messages}/>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  padding-top: 1rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-rows: 15% 70% 15%;
    }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      width: 100%;
      border-radius: 5rem;
      
      align-items: center;
      background-color: black;
      gap: 1rem;
      .avatar {
        img {
          padding-left: 1rem;
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar{
      width: 0.2rem;
      &-thumb{
        background-color: #ffffff39;
        width: .1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: .1rem 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .received {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
        padding: .1rem 1rem;
      }
    }
  }
`