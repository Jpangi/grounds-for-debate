import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';
import SignUp from './components/auth/SignUp';



function App() {
const [user, setUser] = useState(localStorage.getItem('token'))

const SignIn = (data) =>{
  localStorage.setItem('token', data);
  setUser(data)
}

  const signOut = () => {
    localStorage.removeItem('token');
    setUser('');
  }

  return (
    <>
  <h1>Grounds for Debate</h1>
  <SignUp SignIn={SignIn} />
    </>
  )
}

export default App
