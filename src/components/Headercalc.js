import React, { useState } from "react";
import { Button } from "react-daisyui";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import logo2 from "../assets/logo2.png";


function Header({ setToken, token }) {
  const [modal, setModal] = useState(false);
  const history = useNavigate();


  return (
    <div className="header w-full flex justify-between items-center text-[#A0161B] p-5">
      <div className="flex flex-col">
        <a href="/" className="cursor-point">
          <img src={logo} className="w-52 md:w-64 "></img>
        </a>
      </div>
      <div>
        <img src={logo2} className="w-52"></img>
        <div className="flex justify-right">
          <a
            className="py-3 w-full rounded-md bg-white text-[#A0161B] cursor-pointer text-right"
            onClick={() => {
              setModal(true)
            }}
          >
            Sign Out
          </a>
        </div>
      </div>
      {modal &&
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="relative bg-white w-full max-w-md mx-auto rounded-lg shadow-lg">
              <div className="px-6 py-4">
                <div className="text-xl font-semibold mb-2"></div>
                <p className="text-gray-700 text-base">Are you sure you want to sign out?</p>
              </div>
              <div className="flex justify-center w-full px-6 py-4 bg-gray-100 text-right">
                <div className="flex justify-center w-full">
                  <div>
                  <form
                    onSubmit={(e) => {
                      localStorage.removeItem('token');
                      setToken('');
                      history('/')
                    }}
                    className="flex w-auto gap-10 items-center justify-center"
                  >
                    <Button
                      type="submit"
                      className="py-3 w-full rounded-md bg-[#A0161B] text-white cursor-pointer"
                    >Yes</Button>
                  </form>
                  </div>
                  <div className="mx-2"></div>
                  <div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setModal(false)
                    }}
                    className="flex w-auto gap-10 items-center justify-center"
                  >
                    <Button
                      type="submit"
                      className="py-3 w-full rounded-md bg-[#A0161B] text-white cursor-pointer"
                    >No</Button>
                  </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>}
    </div >
  );
}

export default Header;
