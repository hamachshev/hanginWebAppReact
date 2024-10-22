import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Link, useLocation} from 'react-router-dom';
import GetOTP from "./getOTP"
import SubmitOTP from './SubmitOTP';
import ChatsPage from './ChatsPage'
import ChatPage from './ChatPage';

import Testing from './Testing'

const App = () => {

  return (
    <Router>

      
  <Routes>
    <Route path='/' element = {<Testing/>}/>
  </Routes>
  
  </Router>
  )
};

export default App;


