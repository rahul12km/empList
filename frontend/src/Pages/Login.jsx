import React, { useState, useEffect } from "react";

const Login = () => {

  return (
   
        <>
          <div className="container ">
            <div className="flex justify-center items-center h-screen bg-gradient-to-r to-purple-300 from-blue-300">
              <div className="w-96 bg-white p-6 rounded-lg drop-shadow-lg">
                <h2 className=" flex flex-col text-xl font-semibold mb-6 font-pop text-center text-[#424553]">
                  Login
                </h2>
                <form>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-600 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      id="text"
                      className="w-full border-2 border-gray-300 p-3 rounded outline-none focus:border-[#5a49e3]"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="block text-gray-600 mb-2"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="w-full border-2 border-gray-300 p-3 rounded outline-none focus:border-[#5a49e3]"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="checkbox"
                      id="remember"
                      className="mr-2 accent-[#5a49e3]"
                    />
                    <label htmlFor="remember" className="text-gray-600">
                      Remember me
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#685dbb] text-white p-3 rounded font-semibold hover:bg-[#5a49e3] transition duration-300 cursor-pointer"
                  >
                    LOGIN
                  </button>

                </form>
              </div>
            </div>
          </div>
        </>

    
  );
};

export default Login;
