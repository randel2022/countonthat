import React from "react";
import logo from "../assets/logo.png";

function Header() {
  return (
    <div className="header w-full flex justify-between items-center text-[#A0161B] p-5">
      <a href="/" className="cursor-point">
        <img src={logo}></img>
      </a>
      <p>Calculate your Dream</p>
    </div>
  );
}

export default Header;
