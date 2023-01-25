import React from "react";
import logowhite from "../assets/logo-white.png";
import quickbooks from "../assets/quickbooks.png";

function Footer() {
  return (
    <div className="w-full flex gap-5 md:gap-20 flex-col bg-[#1E0607] px-10 md:px-24 lg:px-36 py-5 text-white">
      <div className="grid grid-cols-2 pb-14 md:pb-0 gap-10 md:gap-3 md:grid-cols-4 place-items-center md:place-items-start py-5 md:py-10 ">
        <div className="flex flex-col gap-4 w-full ">
          <img src={logowhite} className="w-64"></img>
          <div className="flex flex-col gap-1 pl-0 md:pl-3">
            <p className="text-xs">
              1455 NW Leary Way Ste.400 Seattle, WA 98107
            </p>
            <p className="text-xs">Phone: 206-734-6080</p>
            <p className="text-xs">Fax: 888-727-8211</p>
            <p className="text-xs">jeff@countonthat.com</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <p className="font-bold">Quick Links</p>
          <ul>
            <li>Home</li>
            <li>Services</li>
            <li>Featured Clients</li>
            <li>About</li>
            <li>Our Team</li>
            <li>Blog</li>
          </ul>
        </div>
        <div className="flex flex-col gap-0 w-full">
          <p className="font-bold">Membership</p>
          <img src={quickbooks} className="w-14"></img>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <p className="font-bold">Support</p>
          <ul>
            <li>Client Login</li>
            <li>SecureSend</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row items-center gap-3 md:gap-0 md:justify-between px-2 mb-4">
        <p className="text-xs">
          Copyright © 2021 CountonThat LLC, All rights reserved.{" "}
        </p>
        <ul className="flex gap-6">
          <li className="text-xs">Terms of Use</li>
          <li className="text-xs">Privacy Policy</li>
          <li className="text-xs">Cookie Policy</li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
