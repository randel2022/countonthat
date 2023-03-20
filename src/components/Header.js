import React from "react";
import logo from "../assets/logo.png";

function Header({token}) {
  return (
    <div className="header w-full flex justify-between items-center text-[#A0161B] p-5">
      <a href="/" className="cursor-point">
        <img src={logo} className="w-52 md:w-64 "></img>
      </a>
      <a
        id="calculate"
        href={token ? "/calculate" : '/signin'}
        className="py-3 px-3 md:px-7 md:text-lg rounded-lg font-bold text-white text-xs md:block delay-150 rounded-3xl bg-[#A0161B] hover:text-gray-400"
      >
        {token ? "Calculate Your Dream" : "Sign In"}
      </a>
    </div>
  );
}

export default Header;
