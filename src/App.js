import './App.css';
// import Nav from './components/Nav';
import Home from './components/Home';
import FrameworkTest from './components/FrameworkTest';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/" exact element = {<Home/>}/>
          <Route path="/frameworkTest" exact element = {<FrameworkTest/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
