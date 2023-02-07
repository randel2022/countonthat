import React from "react";
import logo from "../assets/logo.png";

function Header() {
  return (
    <div className="header w-full flex justify-between items-center text-[#A0161B] p-5">
      <a href="/" className="cursor-point">
        <img src={logo} className="w-52 md:w-64 "></img>
      </a>
    </div>
  );
}

export default Header;
