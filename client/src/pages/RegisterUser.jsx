import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Whisper from "../assets/whisper.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

export default function RegisterUser() {
    const [values, setValues] = useState([])
    const navigate = useNavigate()
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    useEffect(() => {
        if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
          navigate("/");
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value})
        console.log(values)
    }

    const handleValidation = () => {
        const { password, confirmPassword, username } = values
        console.log(password)
        console.log(confirmPassword)
        if (password !== confirmPassword) {
            toast.error(
                "Password and confirm password should be the same.",
                toastOptions
            )
            return false
        } else if (username.length < 3) {
            toast.error(
                'Username should be greater than 3 characters.',
                toastOptions
            )
            return false
        } else if (password.length < 3) {
            toast.error(
                'Password should be greater than 3 characters.',
                toastOptions
            )
            return false
        }
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const { username, password } = values;
            const { data } = await axios.post(registerRoute, {
                username,
                password
            })

            if (data.status === false) {
                toast.error(data.msg, toastOptions)
            }
            if (data.status === true) {
                console.log(data)
                localStorage.setItem(
                    process.env.REACT_APP_LOCALHOST_KEY, 
                    JSON.stringify(data.user)
                )
                localStorage.setItem(
                    process.env.REACT_APP_LOCALHOST_KEY_TOKEN, 
                    (data.token)
                )
                navigate('/')
            }
        }
    }
  return (
    <>
    <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}> 
            <div className="brand">
                <img src={Whisper} alt='whisper' />
                <h1>Whisper</h1>
            </div>
            <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={(e) => handleChange(e)}
            />
            <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => handleChange(e)}
                autoComplete='off'
            />
            <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={(e) => handleChange(e)}
                autoComplete='off'
            />
            <button type= "submit">Create User</button>
            <span>
                Already have an account ? <Link to='/login'>Login.</Link>
            </span>
        </form>
    </FormContainer>
    <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #b5ccf1;
    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img {
            height: 7rem;
        }
        h1 {
            text-transform: uppercase;
        }
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #94a9ce;
        border-radius: 2rem;
        padding: 3rem 5rem;
    }
    input {
        background-color: transparent;
        border-radius: 0.4rem;
        color: black;
        width: 100%;
        font-size: 1rem;
        border: solid .13rem #667395;
        &:focus {
            border: 0.13rem solid black;
            outline: none;
        }
    }
    button {
        background-color: #667395;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: .4rem;
        font-size: 1rem;
        text-transform: uppercase;
        &:hover {
            background-color: #497bd2;
        }
    }
    span {
        text-transform: uppercase;
        a {
            color: #5a569d;
            text-decoration: none;
            font-weight: bold;
        }
    }
`
