import React from 'react';
import Login from './pages/auth/Login'
import Main from './pages/main/Main'
import NotFound from './pages/404/404';
import Register from './pages/auth/Register';

import './App.css'

import {Route, Routes, BrowserRouter as Router} from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<Main />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
