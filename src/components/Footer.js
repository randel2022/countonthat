import React from "react";
import logowhite from "../assets/logo-white.png";

function Footer() {
  return (
    <div className="w-full bg-[#1E0607] p-5 text-white">
      <div className="grid grid-cols-4">
        <div>
          <img src={logowhite}></img>
        </div>
        <div>Select Links</div>
        <div>Membership</div>
        <div>Support</div>
      </div>
    </div>
  );
}

export default Footer;
