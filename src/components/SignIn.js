import React, { useState, useEffect } from 'react'
import './SignIn.css'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function SignIn({ setToken }) {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [apiResponse, setApiResponse] = useState('');
    const history = useNavigate();
    const [modal, setModal] = useState(false); 

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            setError('Please enter your email');
        } else if (!isValidEmail(email)) {
            setError('Please enter a valid email');
        } else {
            setError('');
            x();
        }
    }

    const isValidEmail = (email) => {
        // Simple email validation regex
        return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email);
    };


    const x = async () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        };

        const response = await fetch(
            "http://137.184.16.76:81/api/auth/login",
            requestOptions
        );
        const data = await response.json(); // Await the JSON promise here
        const token = data.token; // Extract the token from the JSON object
        if (token == undefined) {
            setApiResponse(data.message)
        } else {
            setToken(token);
            history('/');
        }

    };

    useEffect(() => {
        if (apiResponse) {
            setModal(true);
        }
    }, [apiResponse])


    return (
        <div className='flex justify-center signin h-full py-20' >
            <div className='flex flex-col lg:w-1/3 md:w-full'>
                <label className='font-size-lg text-center text-[#A0161B] font-bold py-4'>Welcome Back</label>
                <label className='text-center'>Please Enter your details</label>
                <label className='pt-10 pb-2 font-bold'>Email:</label>
                <input
                    className='input input-bordered rounded-md border-slate-400'
                    placeholder='Enter your email'
                    onChange={(e) => setEmail(e.target.value)}
                />
                {error && <p className='text-red-500'>{error}</p>}
                <label className='pt-5 pb-2 font-bold'>Password:</label>
                <div className='flex justify-between input input-bordered rounded-md border-slate-400'>
                    <input
                        className='w-full  focus:border-transparent focus:outline-none'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter your password'
                        onChange={(e) => { setPassword(e.target.value) }}
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
                        onClick={handleSubmit}
                    >Sign in</button>
                </div>
                <label className='text-center text-[#A0161B]'>
                    Don’t have an account?&nbsp;
                    <a className='text-[#3F505D] font-bold' href='/signup'>
                        Sign Up
                    </a>
                </label>
                <label className='text-center text-[#A0161B]'>
                    Don’t have an account?&nbsp;
                    <a className='text-[#3F505D] font-bold' href='/recover'>
                        Forgot Password
                    </a>
                </label>
            </div>
            {modal &&
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="relative bg-white w-full max-w-md mx-auto rounded-lg shadow-lg">
                        <div className="px-6 py-4">
                            <div className="text-xl font-semibold mb-2"></div>
                            <p className="text-gray-700 text-base">{apiResponse}</p>
                        </div>
                        <div className="px-6 py-4 bg-gray-100 text-right">
                            <button className="text-sm px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-200 focus:outline-none" onClick={()=>setModal(false)}>Close</button>
                        </div>
                    </div>
                </div>
            </div>}

        </div>
    )
}

export default SignIn
