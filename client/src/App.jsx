import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';
import SignUp from './components/auth/SignUp';
import LogIn from './components/auth/LogIn';
import Navbar from './components/common/Navbar';
import AddCoffee from './components/coffee/AddCoffee';
import CoffeeList from './components/coffee/UserCoffeeList';
import TopRated from './components/coffee/topRated';
import SingleCoffee from './components/coffee/SingleCoffee';
import EditCoffee from './components/coffee/EditCoffee';



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
         <Route path="/topRated" element={<TopRated/>} />
        <Route path="/signup" element={<SignUp logIn={logIn} />} />
        <Route path="/" element={<LogIn logIn={logIn} />} />
        <Route path="/allCoffee" element={<CoffeeList user={user}/>} />
        <Route path="/addCoffee" element={<AddCoffee user={user}/>} />
        <Route path="coffee/:coffeeId" element={<SingleCoffee user={user}/>} />
        <Route path="coffee/:coffeeId/edit" element={<EditCoffee user={user}/>} />
        

    </Routes>


    </>
  )
}

export default App
