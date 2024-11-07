import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './Components/HomePage'
import FileUpload from './Components/FileUpload';

const App = () => {

  return (
    <Router>

      
  <Routes>
    <Route path='/' element = {<HomePage/>}/>
    <Route path='/file' element = {<FileUpload/>}/>
  </Routes>
  
  </Router>
  )
};

export default App;


