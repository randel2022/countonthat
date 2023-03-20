import React, { useState } from "react";
import { Button } from "react-daisyui";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import logo2 from "../assets/logo2.png";


function HeaderAcc({setToken, token}) {
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
      </div>
    </div >
  );
}

export default HeaderAcc;
