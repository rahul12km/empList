import React from 'react';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <div className="flex justify-between items-center bg-gradient-to-r to-purple-300 from-blue-300 p-4 sticky top-0 z-30">
      <div className="text-lg font-bold">Logo</div>
      <nav className="space-x-10">
        <Link to={"/dashboard"} className="hover:text-blue-500">Home</Link>
        <Link to={"/dashboard"} className="hover:text-blue-500"> Employee List</Link>
      </nav>
      <div className="flex items-center space-x-4">
        <span className="font-semibold">Hukum Gupta</span>
        <a href="#" className="hover:text-red-500">Logout</a>
      </div>
    </div>
  );
};

export default Header;
