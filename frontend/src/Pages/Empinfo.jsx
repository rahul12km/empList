import React, { useState } from 'react';
import Header from '../component/Header';

const Empinfo = () => {
  const [emp, setEmp] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: [],
  });

  const onChangefnc = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setEmp(prevState => ({
        ...prevState,
        course: checked
          ? [...prevState.course, value]
          : prevState.course.filter(course => course !== value)
      }));
    } else if (type === 'radio') {
      setEmp(prevState => ({
        ...prevState,
        [name]: value
      }));
    } else {
      setEmp(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handlesubmit=(e)=>{
    e.preventDefault();
    console.log(emp)

  }

  return (
    <>
      <Header />
      <div className="container mt-[20px]">
        <div className="flex justify-center items-center h-screen">
          <div className="w-[500px] bg-white p-6 rounded-lg drop-shadow-lg mt-[10px]">
            <h2 className="flex flex-col text-xl font-semibold mb-6 font-pop text-center text-[#424553]">
              Create Employee
            </h2>
            <form onSubmit={handlesubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-600 mb-2">
                  Name
                </label>
                <input
                  value={emp.name}
                  type="text"
                  id="name"
                  name="name"
                  onChange={onChangefnc}
                  className="w-full border-2 border-gray-300 p-2 rounded outline-none focus:border-[#5a49e3]"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-600 mb-2">
                  Email
                </label>
                <input
                  value={emp.email}
                  type="email"
                  id="email"
                  name="email"
                  onChange={onChangefnc}
                  className="w-full border-2 border-gray-300 p-2 rounded outline-none focus:border-[#5a49e3]"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="mobile" className="block text-gray-600 mb-2">
                  Mobile Number
                </label>
                <input
                  value={emp.mobile}
                  type="text"
                  id="mobile"
                  name="mobile"
                  onChange={onChangefnc}
                  className="w-full border-2 border-gray-300 p-2 rounded outline-none focus:border-[#5a49e3]"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="designation" className="block text-gray-600 mb-2">
                  Designation
                </label>
                <select
                  value={emp.designation}
                  name="designation"
                  id="designation"
                  onChange={onChangefnc}
                  className="w-full border-2 border-gray-300 p-2 rounded outline-none focus:border-[#5a49e3] bg-white"
                >
                  <option value="hr">HR</option>
                  <option value="manager">Manager</option>
                  <option value="sales">Sales</option>
                </select>
              </div>
              <div className="mb-4">
                <p className="block text-gray-600 mb-2">Gender</p>
                <div className="flex justify-between gap-4 my-2 p-2">
                  <div className="flex gap-2">
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="male"
                      onChange={onChangefnc}
                      checked={emp.gender === "male"}
                    />
                    <label htmlFor="male">Male</label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                      onChange={onChangefnc}
                      checked={emp.gender === "female"}
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="radio"
                      id="other"
                      name="gender"
                      value="other"
                      onChange={onChangefnc}
                      checked={emp.gender === "other"}
                    />
                    <label htmlFor="other">Other</label>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <p className="block text-gray-600 mb-2">Course</p>
                <div className="flex justify-between p-2">
                  <div className="flex">
                    <input
                      name="course"
                      type="checkbox"
                      id="mca"
                      value="mca"
                      onChange={onChangefnc}
                      checked={emp.course.includes("mca")}
                      className="mr-2 accent-[#5a49e3]"
                    />
                    <label htmlFor="mca" className="text-gray-600">
                      MCA
                    </label>
                  </div>
                  <div className="flex">
                    <input
                      name="course"
                      type="checkbox"
                      id="bca"
                      value="bca"
                      onChange={onChangefnc}
                      checked={emp.course.includes("bca")}
                      className="mr-2 accent-[#5a49e3]"
                    />
                    <label htmlFor="bca" className="text-gray-600">
                      BCA
                    </label>
                  </div>
                  <div className="flex">
                    <input
                      name="course"
                      type="checkbox"
                      id="bsc"
                      value="bsc"
                      onChange={onChangefnc}
                      checked={emp.course.includes("bsc")}
                      className="mr-2 accent-[#5a49e3]"
                    />
                    <label htmlFor="bsc" className="text-gray-600">
                      BSC
                    </label>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="profileImage" className="block text-gray-600 mb-2">
                  Upload Profile Image
                </label>
                <div className='flex gap-1'>
                  <input
                    type="file"
                    id="profileImage"
                    name="profileImage"
                    accept="image/*"
                    className="w-full border-2 border-gray-300 p-2 rounded outline-none focus:border-[#5a49e3] bg-white"
                  />
                  <img
                    src='https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0='
                    alt='Profile'
                    className='h-20 w-20'
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-[#685dbb] text-white p-2 rounded font-semibold hover:bg-[#5a49e3] transition duration-300 cursor-pointer"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Empinfo;
