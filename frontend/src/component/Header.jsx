import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom'
const Header = () => {
  const navigate=useNavigate()
  const [logged,setLogged]=useState({})
  useEffect(() => {
    const user = Cookies.get('user');
    
    // If the cookie exists, parse it to get the object
    if (user) {
      const User = JSON.parse(user); // Assuming the user object was stored as a stringified JSON
      setLogged(User);
      
    } else {
      console.log("No user is logged in");
      navigate('/login')

    }
  }, [logged]);

 const handlelogout=() => {
  Cookies.remove('user')
  navigate('/login')
 }

  return (
    <div className="flex justify-between items-center bg-gradient-to-r to-purple-300 from-blue-300 p-4 sticky top-0 z-30">
      <div className="text-lg font-bold">Logo</div>
      <nav className="space-x-10">
        <Link to={"/dashboard"} className="hover:text-blue-500">Home</Link>
        <Link to={"/dashboard"} className="hover:text-blue-500"> Employee List</Link>
      </nav>
      <div className="flex items-center space-x-4">
        <span className="font-semibold">{logged.username}</span>
        <p onClick={handlelogout} className="hover:text-red-500 cursor-pointer">Logout</p>
      </div>
    </div>
  );
};

export default Header;
