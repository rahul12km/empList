import React, { useEffect, useState } from 'react';
import Header from '../component/Header';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom'
import { BaseHost } from '../Api';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate()
  const[empdata,setEmpdata] = useState()

  useEffect(() => {
    const user = Cookies.get('user');
    
    // If the cookie exists, parse it to get the object
    if (user) {
      const parsedUser = JSON.parse(user); // Assuming the user object was stored as a stringified JSON
      console.log(parsedUser.email);
    } else {
      console.log("No user is logged in");
      navigate('/login')

    }
  }, []);

  const formatDate = (date) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-GB', options).replace(',', '');
};

  const fetchFnc=async()=>{
    const {data}=await axios.get(`${BaseHost}/employee/all`);
    if(data){
      console.log(data.employees);
      setEmpdata(data.employees)
    }
  }

  useEffect(() =>{
   fetchFnc();

  },[])

  const handledelete = async (id) => {
    try {
      
      await axios.delete(`${BaseHost}/employee/delete/${id}`);
      
      
      const updatedEmployees = empdata.filter((employee) => employee._id !== id);

     
      setEmpdata(updatedEmployees);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };


  
  return (
    <div className="container mx-auto p-4">
      {/* Reuse the Header component */}
      <Header />

      {/* Sub Header */}
      <div className=" text-center text-[25px] font-semibold py-2 mt-[40px]">
        Employee List
      </div>

      {/* Actions Section */}
      <div className="flex justify-between items-center mt-4 p-4">
        <div className="font-semibold">
          Total Count: 4
        </div>
      
        <div className="flex items-center space-x-2">
          <label htmlFor="search" className="font-semibold">Search:</label>
          <input
            type="text"
            id="search"
            className="border rounded p-2"
            placeholder="Enter Search Keyword"
          />
            <Link to={"/empinfo"} className="bg-[#685dbb] px-4 py-2 rounded hover:bg-green-500">
          Create Employee
        </Link>
        </div>
      </div>

      {/* Employee Table */}
      <table className="table-auto w-full mt-4 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-100">
            <th className="border border-gray-300 px-4 py-2">Unique Id</th>
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Mobile No</th>
            <th className="border border-gray-300 px-4 py-2">Designation</th>
            <th className="border border-gray-300 px-4 py-2">Gender</th>
            <th className="border border-gray-300 px-4 py-2">Course</th>
            <th className="border border-gray-300 px-4 py-2">Create Date</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
         { empdata?.map((employee,i) => (
            <tr key={employee._id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{i}</td>
              <td className="border border-gray-300 px-4 py-2">
                <img src={`${BaseHost}/uploads/${employee?.profileImageURL}`} alt="profile" className="w-10 h-10 rounded-full" />
              </td>
              <td className="border border-gray-300 px-4 py-2">{employee.name}</td>
              <td className="border border-gray-300 px-4 py-2 text-blue-500">
                <a href={`mailto:${employee.email}`}>{employee.email}</a>
              </td>
              <td className="border border-gray-300 px-4 py-2">{employee.mobile}</td>
              <td className="border border-gray-300 px-4 py-2">{employee.designation}</td>
              <td className="border border-gray-300 px-4 py-2">{employee.gender}</td>
              <td className="border border-gray-300 px-4 py-2">{employee.course}</td>
              <td className="border border-gray-300 px-4 py-2">{formatDate(employee.createdAt)}</td>
              <td className="border border-gray-300 px-4 py-2 space-x-2">
                <button className="text-blue-500 hover:underline" onClick={()=>navigate(`/empedit/${employee._id}`)}>Edit</button>
                <button className="text-red-500 hover:underline" onClick={()=>handledelete(employee._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
