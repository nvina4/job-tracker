import { useState } from 'react';
import Login from './Login.jsx'
import Signup from './Signup.jsx'
import Jobs from './Jobs.jsx';
import './App.css'

function App() {

  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [showSignup, setShowSignup] = useState(false);

  if (token) {

    return <Jobs token={token} setToken={setToken}/>
  }

  return showSignup
   ? <Signup setShowSignup={setShowSignup} />
   : <Login setShowSignup={setShowSignup} setToken={setToken}/>;
   
};

export default App;