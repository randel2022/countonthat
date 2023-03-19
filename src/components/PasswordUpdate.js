import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import checkmark from "../assets/Rectanglecheckmark.png";

function PasswordUpdate() {
    const history = useNavigate();

    const handleSubmit = () => {
        history('/signin')
    }


    return (
        <div className='flex justify-center signin h-full py-20'>
            <div className='flex flex-col lg:w-1/3 md:w-full'>
                <label className='font-size-lg text-center text-[#A0161B] font-bold py-4'>Password Updated</label>
                <div className='flex justify-center w:full'>
                    <img src={checkmark} alt='' style={{ width: '128px', height: '128px' }}/>
                </div>
                <label className='text-center'>Please Enter your details</label>
                <div className='pt-10 pb-5'>    
                    <button 
                        className="py-3 w-full rounded-md bg-[#A0161B] text-white cursor-pointer self-center md:self-end"
                        onClick = {handleSubmit}
                        >Log In</button>
                </div>
            </div>
        </div>
    )
}

export default PasswordUpdate
