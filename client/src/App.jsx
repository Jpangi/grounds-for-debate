import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';
import SignUp from './components/auth/SignUp';
import LogIn from './components/auth/LogIn';
import Navbar from './components/common/Navbar';
import TopRated from './components/coffee/topRated';
import AddCoffee from "./components/coffee/AddCoffee"


function App() {
const [user, setUser] = useState(localStorage.getItem('token'))

const logIn = (data) =>{
  localStorage.setItem('token', data);
  setUser(data)
}

  const signOut = () => {
    localStorage.removeItem('token');
    setUser('');
  }

  return (
    <>
    <Navbar signOut={signOut} user={user} />
    <Routes>
         <Route path="/" element={<h2>Sign In Or Sign Up</h2>} />
         <Route path="/topRated" element={<TopRated/>} />
        
        <Route path="/signup" element={<SignUp logIn={logIn} />} />
        <Route path="/login" element={<LogIn logIn={logIn} />} />
        <Route path="/addCoffee" element={<AddCoffee logIn={logIn}/>} />

    </Routes>


    </>
  )
}

export default App
