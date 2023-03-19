import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function ResetPassword() {
    const {token} = useParams();
    const history = useNavigate();
    const [showPassword, setShowPassword] = useState(true);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [token1, setToken1] = useState('');
    const [message, setMessage] = useState()
    const [modal, setModal] = useState(false);


    useEffect(() => {setToken1(token)},[token])
    useEffect(() => {
        
        if(message == 'Your password has been updated.'){
            history('/updated');
        }else{
            if(message != undefined){
            setModal(true);
            }
        }
        
    },[message])

    const handleSubmit = () => {
        x();
    }



    const x = async() => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                password: password,
                confirmPassword: confirmPassword,
                token: token1
            }),
        };

        const response = await fetch(
            "http://137.184.16.76:81/api/auth/reset",
            // "http://137.184.16.76:81/api/auth/reset",
            requestOptions
        );
        const data = await response.json(); // Await the JSON promise here

        if(data.message != undefined){
           setMessage(data.message);
        }else{
            setMessage(data.error.confirmPassword);
        }
    };

    return (
        <div className='flex justify-center signin h-full py-20'>
            <div className='flex flex-col lg:w-1/3 md:w-full'>
                <label className='font-size-lg text-center text-[#A0161B] font-bold py-4'>Reset Password</label>
                <label className='text-center'>Please Enter your details</label>
                <label className='pt-5 pb-2 font-bold'>Password:</label>
                <div className='flex justify-between input input-bordered rounded-md border-slate-400'>
                    <input
                        className='w-full  focus:border-transparent focus:outline-none'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter your password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className='flex items-center'>
                        {showPassword ? (
                            <FaEyeSlash onClick={() => setShowPassword(false)} />
                        ) : (
                            <FaEye onClick={() => setShowPassword(true)} />
                        )}
                    </div>
                </div>
                <label className='pt-5 pb-2 font-bold'>Confirm Password:</label>
                <div className='flex justify-between input input-bordered rounded-md border-slate-400'>
                    <input
                        className='w-full  focus:border-transparent focus:outline-none'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter your password'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div className='flex items-center'>
                        {showPassword ? (
                            <FaEyeSlash onClick={() => setShowPassword(false)} />
                        ) : (
                            <FaEye onClick={() => setShowPassword(true)} />
                        )}
                    </div>
                </div>
                <div className='pt-10 pb-5'>    
                    <button 
                        className="py-3 w-full rounded-md bg-[#A0161B] text-white cursor-pointer self-center md:self-end"
                        onClick = {handleSubmit}
                        >Update</button>
                </div>
                <label className='text-center text-[#A0161B]'>
                    Already have an account?&nbsp;
                    <a className='text-[#3F505D] font-bold' href='/signin'>
                        Log In
                    </a>
                </label>
            </div>

            {modal &&
            <div class="fixed z-10 inset-0 overflow-y-auto">
                <div class="flex items-center justify-center min-h-screen">
                    <div class="relative bg-white w-full max-w-md mx-auto rounded-lg shadow-lg">
                        <div class="px-6 py-4">
                            <div class="text-xl font-semibold mb-2"></div>
                            <p class="text-gray-700 text-base">{message}</p>
                        </div>
                        <div class="px-6 py-4 bg-gray-100 text-right">
                            <button class="text-sm px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-200 focus:outline-none" onClick={()=>setModal(false)}>Close</button>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default ResetPassword
