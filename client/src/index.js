import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserProvider from './context/UserProvider';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/RegisterUser.jsx';
import Private from './pages/Private';
import SetAvatar from './pages/SetAvatar';
import Public from './pages/Public';
import Create from './pages/Create';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/setAvatar" element={<SetAvatar />} /> 
          <Route path='/' element={<App />}>
            <Route path='/' element={<Private />}/>
            <Route path='/public' element={<Public />}/>
            <Route path='/create' element={<Create />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);

