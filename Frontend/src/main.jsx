import React from 'react';
// import { StrictMode } from 'react'
import  ReactDom from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDom.createRoot(document.getElementById('root')).render(
  <Provider store = {store}>    
    <BrowserRouter>
    <App />
    <ToastContainer />
    </BrowserRouter>
    </Provider>


)
