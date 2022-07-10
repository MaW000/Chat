import React  from 'react'
import { useNavigate } from 'react-router';
import styled from 'styled-components';
export default function Navbar() {
    const navigate = useNavigate()
  return (
    <Container>
        <div className='nav'>
            <div className='links'>
                <div className='link first' onClick={()=> navigate('/public')}>
                    <h1>
                        Server
                    </h1>
                </div>
                <div className='link mid' onClick={()=> navigate('/')}>
                    <h1>
                        Private
                    </h1>
                </div>
                <div className='link middle' onClick={()=> navigate('/create')}>
                    <h1>
                        Create
                    </h1>
                </div>
                <div className='link last'>
                    <h1>
                        Logout
                    </h1>
                </div>
            </div>
        </div>
    </Container>
  )
}

const Container = styled.div`
    .nav {
		background-color: #0c55d4;
		width: 85vw;
		.links {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0px 15rem 0px 15rem
			
		}
		
		.link {
			background-color: #0c55d4;
			&:hover {
				cursor: pointer;
				color:white;
				padding-left: 125px;
    		margin-left: -125px;
				padding-right: 125px;
    		margin-right: -125px;
				background-color: #062e6d;
				transition: .2s ease-in-out;
			}
		}
	}
`