import React from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from './pages/Navbar'
import styled from 'styled-components'
function App() {
  return (
    <Container>
      <Navbar />
      <Outlet />
    </Container>
  );
}

const Container = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #497bd2;

`

export default App;
