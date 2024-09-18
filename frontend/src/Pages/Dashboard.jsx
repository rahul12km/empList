import React from 'react';
import Header from '../component/Header';
import { Link } from 'react-router-dom';

const Dashboard = () => {
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
          {[
            {
              id: 1,
              image: '/path-to-image',
              name: 'Hukum',
              email: 'hcgupta@cstech.in',
              mobile: '954010044',
              designation: 'HR',
              gender: 'Male',
              course: 'MCA',
              createDate: '13-Feb-21',
            },
            {
              id: 2,
              image: '/path-to-image',
              name: 'Manish',
              email: 'manish@cstech.in',
              mobile: '954010033',
              designation: 'Sales',
              gender: 'Male',
              course: 'BCA',
              createDate: '12-Feb-21',
            },
            {
              id: 3,
              image: '/path-to-image',
              name: 'Yash',
              email: 'yash@cstech.in',
              mobile: '954010022',
              designation: 'Manager',
              gender: 'Male',
              course: 'BSC',
              createDate: '11-Feb-21',
            },
            {
              id: 4,
              image: '/path-to-image',
              name: 'Abhishek',
              email: 'abhishek@cstech.in',
              mobile: '954010033',
              designation: 'HR',
              gender: 'Male',
              course: 'MCA',
              createDate: '13-Feb-21',
            },
          ].map((employee) => (
            <tr key={employee.id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{employee.id}</td>
              <td className="border border-gray-300 px-4 py-2">
                <img src={employee.image} alt="profile" className="w-10 h-10 rounded-full" />
              </td>
              <td className="border border-gray-300 px-4 py-2">{employee.name}</td>
              <td className="border border-gray-300 px-4 py-2 text-blue-500">
                <a href={`mailto:${employee.email}`}>{employee.email}</a>
              </td>
              <td className="border border-gray-300 px-4 py-2">{employee.mobile}</td>
              <td className="border border-gray-300 px-4 py-2">{employee.designation}</td>
              <td className="border border-gray-300 px-4 py-2">{employee.gender}</td>
              <td className="border border-gray-300 px-4 py-2">{employee.course}</td>
              <td className="border border-gray-300 px-4 py-2">{employee.createDate}</td>
              <td className="border border-gray-300 px-4 py-2 space-x-2">
                <button className="text-blue-500 hover:underline">Edit</button>
                <button className="text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
