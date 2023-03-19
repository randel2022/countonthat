import React, { useState, useEffect } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [showPassword, setShowPassword] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [message, setMessage] = useState();
    const [modal, setModal] = useState(false);
    const [success, setSucess] = useState(false)
    const history = useNavigate();

    const handleSubmit = () => {
        x();
    }

    useEffect(() => {

        if (message == 'Created user successfully.') {
            setModal(true);
            setSucess(true);
        } else {
            if (message != undefined) {
                setModal(true)
            }
        }

    }, [message])

    const x = async () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                firstName: firstname,
                lastName: lastname,
            }),
        };

        const response = await fetch(
            "http://137.184.16.76:81/api/auth/register",
            requestOptions
        );
        const data = await response.json(); // Await the JSON promise here
        const token = data.token; // Extract the token from the JSON object
        if (data.message != undefined) {
            setMessage(data.message);
            console.log(data.message)
        } else {
            setMessage(data);
        }
    };

    return (
        <div className='flex justify-center signin h-full py-20'>
            <div className='flex flex-col lg:w-1/3 md:w-full'>
                <label className='font-size-lg text-center text-[#A0161B] font-bold py-4'>Create an Account</label>
                <label className='text-center'>Please Enter your details</label>
                <label className='pt-10 pb-2 font-bold'>First Name:</label>
                <input
                    className='input input-bordered rounded-md border-slate-400'
                    placeholder='Enter your first name'
                    onChange={(e) => setFirstname(e.target.value)}
                />
                <label className='pt-5 pb-2 font-bold'>Last Name:</label>
                <input
                    className='input input-bordered rounded-md border-slate-400'
                    placeholder='Enter your last name'
                    onChange={(e) => setLastname(e.target.value)}
                />
                <label className='pt-5 pb-2 font-bold'>Email:</label>
                <input
                    className='input input-bordered rounded-md border-slate-400'
                    placeholder='Enter your email'
                    onChange={(e) => setEmail(e.target.value)}
                />
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
                        onClick={handleSubmit}
                    >Sign Up</button>
                </div>
                <label className='text-center text-[#A0161B]'>
                    Already have an account?&nbsp;
                    <a className='text-[#3F505D] font-bold' href='/signin'>
                        Log In
                    </a>
                </label>
            </div>


            {modal &&
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="relative bg-white w-full max-w-md mx-auto rounded-lg shadow-lg">
                            <div className="px-6 py-4">
                                <div className="text-xl font-semibold mb-2"></div>
                                <p className="text-gray-700 text-base">
                                    {success ? 
                                        message
                                    :Object.entries(message.error).map(([key, value]) => (
                                        <li key={key} className="mb-2">
                                            <span className="font-medium">{key}:</span> {value}
                                        </li>
                                    ))}

                                </p>
                            </div>
                            <div className="px-6 py-4 bg-gray-100 text-right">
                                <button className="text-sm px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-200 focus:outline-none" 
                                onClick={() => {
                                    success? 
                                    history('/signin')
                                    : setModal(false)}}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default SignUp
