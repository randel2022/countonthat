import React from "react";
import logo from "../assets/logo.png";

function Header() {
  return (
    <div className="header w-full flex justify-between items-center text-[#A0161B] p-5">
      <a href="/" className="cursor-point">
        <img src={logo} className="w-64"></img>
      </a>
      <a
        href="/calculate"
        className="py-3 hidden md:block px-3 rounded-3xl bg-[#A0161B] text-white"
      >
        Calculate Your Dream
      </a>
    </div>
  );
}

export default Header;
