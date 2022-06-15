import React from 'react'
import wave from '../assets/waver.gif'
import styled from 'styled-components'
export default function Welcome({currentUser}) {
  return (
    <Container>
        <img src={wave}/>
        <h1>
            Welcome, <span>{currentUser.username}!</span>
        </h1>
        <h3>Please select a chat to Start Messaging!</h3>
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    color:white;
    padding-left: 2rem;
    img {
        height: 20rem;
        width: 15rem;
    }
    span {
        color: #0432ff
    }
`
