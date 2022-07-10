import React, { useState, useEffect, useRef, useContext, } from 'react'
import { UserContext } from "../context/UserProvider";
import {  createServerRoute } from '../utils/APIRoutes'
import styled from 'styled-components'
export default function Create() {
    const [serverName, setServerName] = useState('')
    const [response, setResponse] = useState('')
    const { userAxios } = useContext(UserContext)
    const handleChange = (e) => {
        setServerName(e.target.value)
    }

    const clickHandle = () => {
        const createServer = async() => {
            const rest = await userAxios.post(createServerRoute,{
                serverName
            })
              .then(res => setResponse(res.data.msg))
            setServerName('')
            console.log(rest)
        }
        createServer()
    }

    return (
		<Container>
			<div className='container'>
                <div className='field'>
                    <input onChange={handleChange} value={serverName} placeholder='Server Name' />
                    <button onClick={clickHandle}>Create Server</button>
                </div>
                <h1>
                {response}
                </h1>
			</div>
		</Container>
    )
}

const Container = styled.div`
.container {
			height: 85vh;
			width: 85vw;
			background-color: #83a8e4;
			text-align: center;
      display: flex;
      flex-direction: column;
      gap: 25px;
      justify-content: center;
      align-items: center;
			@media screen and (min-width: 720px) and (max-width: 1080px) {
				
			}
}
.contacts-container {
    background-color: beige;
}
.field {
    display: grid;
    justify-content: center;
    
    gap: 5px;
  width: 55%;
  height: 75px;
  border-radius: 4px;
  position: relative;
  background-color: #074fc2c4;
  transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out;
}

.field:hover {
  background-color: #0b62ed9f;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
}

.field.active {
  background-color: #ffffff;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);
}

.field.active input {
  padding: 24px 16px 8px 16px;
}

.field.active input + label {
  top: 4px;
  opacity: 1;
  color: #512da8;
}

.field.locked {
  pointer-events: none;
}

.field input {
    
  width: 55%;
  height: 75px;
  position: relative;
  padding-left: 270px;
  
  border: none;
  border-radius: 4px;
  font-family: "Gotham SSm A", "Gotham SSm B", sans-serif;
  font-size: 35px;
  font-weight: 400;
  line-height: normal;
  background-color: transparent;
  color: #282828;
  outline: none;
  box-shadow: 0px 4px 20px 0px transparent;
  transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out,
    0.1s padding ease-in-out;
  -webkit-appearance: none;
}

.field input::-webkit-input-placeholder {
  color: rgba(255, 255, 255, 0.8);
}
.field input::-moz-placeholder {
  color: rgba(255, 255, 255, 0.8);
}
.field input:-ms-input-placeholder {
  color: rgba(255, 255, 255, 0.8);
}
.field input:-moz-placeholder {
  color: rgba(255, 255, 255, 0.8);
}

.field input + label {
  position: absolute;
  top: 24px;
  left: 16px;
  font-family: "Gotham SSm A", "Gotham SSm B", sans-serif;
  font-size: 12px;
  font-weight: 600;
  line-height: 24px;
  color: #ffffff;
  opacity: 0;
  pointer-events: none;
  transition: 0.1s all ease-in-out;
}

.field input + label.error {
  color: #ec392f;
}

.field p.predicted {
  position: absolute;
  top: 8px;
  left: 16px;
  font-family: "Gotham SSm A", "Gotham SSm B", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #e0e0e0;
  opacity: 1;
  pointer-events: none;
}

.field button {
    width: 50%;
    height: 35px;
    background-color: #063480;
    color: rgba(255, 255, 255, 0.8);
    border: transparent;
    border-radius: 4px;
    margin-left: 185px;
}

`