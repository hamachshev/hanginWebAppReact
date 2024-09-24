import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import GetOTP from "./getOTP"
import SubmitOTP from './SubmitOTP';
import Chats from './chats'

const App = () => {
  return (
    <Router>
  <Routes>
    <Route path='/' element = {<GetOTP/>}/>
    <Route path='/submit' element = {<SubmitOTP />}/>
    <Route path='/chats' element = {<Chats/>}/>
  </Routes>
  </Router>
  )
};

export default App;


