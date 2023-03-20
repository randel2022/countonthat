import React, { useState } from "react";
import { Button } from "react-daisyui";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import logo2 from "../assets/logo2.png";


function Header({setToken, token}) {
  const [modal, setModal] = useState(false);
  const history = useNavigate();


  return (
    <div className="header w-full flex justify-between items-center text-[#A0161B] p-5">
      <div>
        <a href="/" className="cursor-point">
          <img src={logo} className="w-52 md:w-64 "></img>
        </a>
      </div>
      <div>
        <img src={logo2} className="w-52"></img>
        {token ?
        <Button
          className="py-3 px-3 md:px-7 md:text-lg rounded-lg font-bold text-white text-xs md:block delay-150 rounded-3xl bg-[#A0161B] hover:text-gray-400"
          onClick={() => {
            setModal(true)
          }}
        > 
          Sign Out
        </Button>: <></>
        }
      </div>
      {modal &&
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="relative bg-white w-full max-w-md mx-auto rounded-lg shadow-lg">
              <div className="px-6 py-4">
                <div className="text-xl font-semibold mb-2"></div>
                <p className="text-gray-700 text-base">Are you sure you want to sign out?</p>
              </div>
              <div className="flex justify-center px-6 py-4 bg-gray-100 text-right">
                <Button
                  className="py-3 px-3 md:px-7 md:text-lg rounded-lg font-bold text-white text-xs md:block delay-150 rounded-3xl bg-[#A0161B] hover:text-gray-400"
                  onClick={() => {
                    localStorage.removeItem('token');
                    setToken('');
                    history('/')
                  }}
                >
                  Yes
                </Button>
                <Button
                  className="py-3 px-3 md:px-7 md:text-lg rounded-lg font-bold text-white text-xs md:block delay-150 rounded-3xl bg-[#A0161B] hover:text-gray-400"
                  onClick={() => {
                    setModal(false)
                  }}
                >
                  No
                </Button>
              </div>
            </div>
          </div>
        </div>}
    </div >
  );
}

export default Header;
