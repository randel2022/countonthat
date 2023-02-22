import React from "react";
import logo from "../assets/logo.png";
import logo2 from "../assets/logo2.png";

function Header() {
  return (
    <div className="header w-full flex justify-between items-center text-[#A0161B] p-5">
      <a href="/" className="cursor-point">
        <img src={logo} className="w-52 md:w-64 "></img>
      </a>
      <img src={logo2} className="w-52"></img>
    </div>
  );
}

export default Header;
