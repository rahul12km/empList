import React, { useState, useEffect } from 'react';
import Header from '../component/Header';
import axios from 'axios';
import { BaseHost } from '../Api';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EmpEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [emp, setEmp] = useState({
        name: "",
        email: "",
        mobile: "",
        designation: "",
        gender: "",
        course: [],
        profileImage: null,
        profileImageURL: ''
    });

    // Fetch employee data from the server
    const fetchFnc = async () => {
        try {
            const response = await axios.get(`${BaseHost}/employee/${id}`);
            const employee = response.data.employee;
            console.log(employee);

            console.log(`${BaseHost}/uploads/${employee.profileImageURL}`)

            // Set initial employee data
            setEmp({
                ...employee,
                profileImageURL: employee.profileImageURL ? `${BaseHost}/uploads/${employee.profileImageURL}` : ''
            });
        } catch (error) {
            console.error('Error fetching employee by ID:', error);
        }
    };

    useEffect(() => {
        fetchFnc();
    }, [id]);

    const onChangefnc = (e) => {
        const { name, value, type, checked, files } = e.target;

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
        } else if (type === 'file') {
            const file = files[0];
            setEmp(prevState => ({
                ...prevState,
                profileImage: file,
                profileImageUrl: URL.createObjectURL(file) // Create a preview URL
            }));
        } else {
            setEmp(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handlesubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', emp.name);
        formData.append('email', emp.email);
        formData.append('mobile', emp.mobile);
        formData.append('designation', emp.designation);
        formData.append('gender', emp.gender);
        emp.course.forEach(course => formData.append('course', course));
        if (emp.profileImage) {
            formData.append('profileImage', emp.profileImage);
        }

        try {
            const response = await axios.put(`${BaseHost}/employee/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert(response.data.message);
            navigate('/dashboard');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data.message);
            } else {
                alert('An error occurred. Please try again.');
            }
        }
    };

    return (
        <>
            <Header />
            <div className="container mt-[20px]">
                <div className="flex justify-center items-center h-screen">
                    <div className="w-[500px] bg-white p-6 rounded-lg drop-shadow-lg mt-[10px]">
                        <h2 className="flex flex-col text-xl font-semibold mb-6 font-pop text-center text-[#424553]">
                            Edit Employee
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
                                <div className='flex gap-1 items-center'>
                                    <input
                                        type="file"
                                        id="profileImage"
                                        name="profileImage"
                                        accept="image/*"
                                        onChange={onChangefnc}
                                        className="w-full border-2 border-gray-300 p-2 rounded outline-none focus:border-[#5a49e3] bg-white"
                                    />
                                    <img
                                        src={emp.profileImageURL}
                                        alt='Profile Preview'
                                        className='h-20 w-20 object-cover ml-2'
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#685dbb] text-white p-2 rounded font-semibold hover:bg-[#5a49e3] transition duration-300 cursor-pointer"
                            >
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmpEdit;
