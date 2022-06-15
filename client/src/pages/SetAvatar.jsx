import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { Buffer } from "buffer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";
import { UserContext } from "../context/UserProvider";
export default function SetAvatar() {
    const { userAxios } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(true)
    const api = `https://avatars.dicebear.com/api/pixel-art/`
    const [avatars, setAvatars] = useState([])
    const [selectedAvatar, setSelectedAvatar] = useState(undefined)
    const navigate = useNavigate()
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }
    
    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error('Please select an avatar', toastOptions)
        } else {
            console.log(userAxios)
            const user = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
            const { data } = await userAxios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar]
            })
            
            if(data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image
                localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(user))
                navigate('/private')
            } else {
                toast.error('Error setting avatar. Please try again', toastOptions)
            }
        }
    }

    useEffect(() => {
        async function fetchAvatar() {
            const data = [];
            for(let i = 0; i < 4; i++) {
                const image = await axios.get(
                    `${api}/${Math.round(Math.random() * 1000)}.svg`
                )
                
                const imgBuffer = new Buffer(image.data)
                
                data.push(imgBuffer.toString('base64'))
            }
            setAvatars(data);
            setIsLoading(false)
        }
        fetchAvatar()
    },[])

  return (
    <>
    {
        isLoading ? 
        <Container>
            <div className="loadingio-spinner-spinner-of9fzpasrik"><div className="ldio-ubw1xjr05ck">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            </div></div>
        </Container>
        :
        <Container>
            <div className="title">
                <h1>
                    Pick an avatar as your profile picture
                </h1>
            </div>
            <div className="avatars">
                {
                    avatars.map((avatar, index) => {
                        return (
                            <div key={index} className={
                                `avatar ${selectedAvatar === index ? "selected" : ''
                            }`}
                            >
                                <img
                                    key={avatar}
                                    src={`data:image/svg+xml;base64, ${avatar}`}
                                    alt="avatar"
                                    onClick={() => setSelectedAvatar(index)} 
                                />
                            </div>
                        )
                    })
                }
            </div>
            <button className="submit-btn" onClick={setProfilePicture}>
                Set as Profile Picture
            </button>
        </Container>
    }
    <ToastContainer/>
    </>
  )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background-color: #b5ccf1;
    height: 100vh;
    width: 100vw;
    .avatars {
        display: flex;
        gap: 2rem;
        .avatar {
            border: .4rem solid transparent;
            padding: 0.4rem;
           
            display: flex;
            justify-content: center;
            align-items: center;
            transition: .5s ease-in-out;
            img {
                height: 6rem;
            }
        }
        .selected { 
            border: .4rem solid #497bd2;
        }
    }
    button {
        background-color: #667395;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        &:hover {
            background-color: #497bd2;
        }
    }




    @keyframes ldio-ubw1xjr05ck {
    0% { opacity: 1 }
    100% { opacity: 0 }
    }
    .ldio-ubw1xjr05ck div {
    left: 94px;
    top: 48px;
    position: absolute;
    animation: ldio-ubw1xjr05ck linear 1s infinite;
    background: #b5ccf1;
    width: 12px;
    height: 24px;
    border-radius: 6px / 12px;
    transform-origin: 6px 52px;
    }.ldio-ubw1xjr05ck div:nth-child(1) {
    transform: rotate(0deg);
    animation-delay: -0.9166666666666666s;
    background: #5c7db6;
    }.ldio-ubw1xjr05ck div:nth-child(2) {
    transform: rotate(30deg);
    animation-delay: -0.8333333333333334s;
    background: #5c7db6;
    }.ldio-ubw1xjr05ck div:nth-child(3) {
    transform: rotate(60deg);
    animation-delay: -0.75s;
    background: #5c7db6;
    }.ldio-ubw1xjr05ck div:nth-child(4) {
    transform: rotate(90deg);
    animation-delay: -0.6666666666666666s;
    background: #5c7db6;
    }.ldio-ubw1xjr05ck div:nth-child(5) {
    transform: rotate(120deg);
    animation-delay: -0.5833333333333334s;
    background: #5c7db6;
    }.ldio-ubw1xjr05ck div:nth-child(6) {
    transform: rotate(150deg);
    animation-delay: -0.5s;
    background: #5c7db6;
    }.ldio-ubw1xjr05ck div:nth-child(7) {
    transform: rotate(180deg);
    animation-delay: -0.4166666666666667s;
    background: #5c7db6;
    }.ldio-ubw1xjr05ck div:nth-child(8) {
    transform: rotate(210deg);
    animation-delay: -0.3333333333333333s;
    background: #5c7db6;
    }.ldio-ubw1xjr05ck div:nth-child(9) {
    transform: rotate(240deg);
    animation-delay: -0.25s;
    background: #5c7db6;
    }.ldio-ubw1xjr05ck div:nth-child(10) {
    transform: rotate(270deg);
    animation-delay: -0.16666666666666666s;
    background: #5c7db6;
    }.ldio-ubw1xjr05ck div:nth-child(11) {
    transform: rotate(300deg);
    animation-delay: -0.08333333333333333s;
    background: #5c7db6;
    }.ldio-ubw1xjr05ck div:nth-child(12) {
    transform: rotate(330deg);
    animation-delay: 0s;
    background: #5c7db6;
    }
    .loadingio-spinner-spinner-of9fzpasrik {
    width: 200px;
    height: 200px;
    display: inline-block;
    overflow: hidden;
    background: #94b3e48d;
    border-radius: 2rem;
    }
    .ldio-ubw1xjr05ck {
    width: 100%;
    height: 100%;
    position: relative;
    transform: translateZ(0) scale(1);
    backface-visibility: hidden;
    transform-origin: 0 0; /* see note above */
}
    .ldio-ubw1xjr05ck div { box-sizing: content-box; }
`

