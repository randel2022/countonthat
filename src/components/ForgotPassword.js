import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';


function ForgotPassword({setToken}) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [modal, setModal] = useState(false); 
    const [message, setMessage] = useState();
    const [success, setSuccess] = useState(false);
    const history = useNavigate();

    const handleSubmit = (e) =>{
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

    useEffect(() => {

        if (message == 'A reset email has been sent to elias@rooche.net.') {
            setModal(true);
            setSuccess(true);
        } else {
            if (message != undefined) {
                setModal(true)
            }
        }

    }, [message])

    const x = async() => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
            }),
        };

        const response = await fetch(
            "http://137.184.16.76:81/api/auth/recover",
            // "http://137.184.16.76:81/api/auth/recover",
            requestOptions
        );
        const data = await response.json(); // Await the JSON promise here
        const token = data.token; // Extract the token from the JSON object
        setMessage(data.message)
    };
    


  return (
    <div className='flex justify-center signin h-full py-20' >
        <div className='flex flex-col lg:w-1/3 md:w-full'>
            <label className='font-size-lg text-center text-[#A0161B] font-bold py-4'>Forgot Password</label>
            <label className='text-center'>Please Enter your details</label>
            <label className='pt-10 pb-2 font-bold'>Email:</label>
            <input 
                className='input input-bordered rounded-md border-slate-400'
                placeholder='Enter your email'
                onChange={(e) => setEmail(e.target.value)}
                />
                {error && <p className='text-red-500'>{error}</p>}
            <div className='pt-10 pb-5'>
                <button 
                    className="py-3 w-full rounded-md bg-[#A0161B] text-white cursor-pointer self-center md:self-end"
                    onClick={handleSubmit}>Next</button>
            </div>
            <label className='text-center text-[#A0161B]'>
                Don’t have an account?&nbsp;
                <a className='text-[#3F505D] font-bold' href='/signup'>
                    Sign Up
                </a>
            </label>
        </div>

        {modal &&
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="relative bg-white w-full max-w-md mx-auto rounded-lg shadow-lg">
                        <div className="px-6 py-4">
                            <div className="text-xl font-semibold mb-2"></div>
                            <p className="text-gray-700 text-base">{message}</p>
                        </div>
                        <div className="px-6 py-4 bg-gray-100 text-right">
                            <button className="text-sm px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-200 focus:outline-none" 
                            onClick={()=>{ success ? 
                                history('/') :
                                setModal(false);
                                
                                }}>Close</button>
                        </div>
                    </div>
                </div>
            </div>}


    </div>
  )
}

export default ForgotPassword
