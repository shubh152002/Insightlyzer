import React from 'react'
import { Routes, Route, Router } from 'react-router-dom';
import Home from '../src/pages/Home'
import Login from '../src/pages/Login';
import Register from '../src/pages/Register';
import Dashboard from './pages/Dashboard';
const App = () => {
  return (
    <>
    
     <Routes>
       <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
     </Routes>
    
    </>
  )
}

export default App
