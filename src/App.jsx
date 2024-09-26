import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Link, useLocation} from 'react-router-dom';
import GetOTP from "./getOTP"
import SubmitOTP from './SubmitOTP';
import Chats from './chats'
import Chat from './Chat';
import Component1 from './Component1';

const App = () => {

  return (
    <Router>
      {/* <Component1/> */}
      
  <Routes>
    <Route path='/' element = {<GetOTP/>}/>
    <Route path='/submit' element = {<SubmitOTP />}/>
    <Route path='/chats' element = {<Chats/>}/>
    <Route path='/chat/:id' element = {<Chat/>}/>
  </Routes>
  
  </Router>
  )
};

export default App;


