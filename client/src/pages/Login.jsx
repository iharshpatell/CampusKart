import React, { useState } from 'react';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
// import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
import fetchUserDetails from '../utils/fetchUserDetails';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';

const Login = () => {
    const [data, setData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const valideValue = Object.values(data).every((el) => el);

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await Axios({ url: "http://localhost:4000/api/user/login", method: "POST", data });
            console.log("Login response:", response.data); // Debugging
    
            if (response.data.error) {
                toast.error(response.data.message);
            }
            if (response.data.success) {
                toast.success(response.data.message);
    
                // Store the access token in localStorage as "token"
                const accessToken = response.data.data.accesstoken;
                if (accessToken) {
                    localStorage.setItem('token', accessToken);
                    console.log("Token saved to localStorage:", accessToken); // Debugging
                } else {
                    console.error("Access token is missing in the response.");
                }
    
                // Optionally, store the refresh token if needed
                const refreshToken = response.data.data.refreshToken;
                if (refreshToken) {
                    localStorage.setItem('refreshToken', refreshToken);
                }
    
                // Fetch user details and update the Redux store
                const userDetails = await fetchUserDetails();
                dispatch(setUserDetails(userDetails.data));
    
                // Clear the form and navigate to the home page
                setData({ email: '', password: '' });
                navigate('/');
            }
        } catch (error) {
            console.error("Error during login:", error); // Debugging
            AxiosToastError(error);
        }
    };
    

    return (
        <section className='w-full container mx-auto px-2'>
            <div className='bg-[#F8FAFC] my-4 w-full max-w-lg mx-auto rounded-lg shadow-lg p-7'>
                <form className='grid gap-4 py-4' onSubmit={handleSubmit}>
                    <div className='grid gap-1'>
                        <label htmlFor='email' className='text-gray-700 font-medium'>
                            Email:
                        </label>
                        <input
                            type='email'
                            id='email'
                            className='bg-gray-100 p-2 border rounded outline-none focus:border-[#64748B]'
                            name='email'
                            value={data.email}
                            onChange={handleChange}
                            placeholder='Enter your email'
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='password' className='text-gray-700 font-medium'>
                            Password:
                        </label>
                        <div className='bg-gray-100 p-2 border rounded flex items-center focus-within:border-[#64748B]'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id='password'
                                className='w-full outline-none bg-gray-100'
                                name='password'
                                value={data.password}
                                onChange={handleChange}
                                placeholder='Enter your password'
                            />
                            <div
                                onClick={() => setShowPassword((prev) => !prev)}
                                className='cursor-pointer text-gray-600'
                            >
                                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                            </div>
                        </div>
                        <Link
                            to={'/forgot-password'}
                            className='block ml-auto text-[#64748B] hover:text-[#475569] font-medium'
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        disabled={!valideValue}
                        className={`text-white py-2 rounded-lg font-semibold my-3 tracking-wide transition-all 
                            ${valideValue ? 'bg-[#27667B] hover:bg-[#1E4F5F]' : 'bg-gray-500 cursor-not-allowed'}`}
                    >
                        Login
                    </button>
                </form>

                <p className='text-gray-700'>
                    Don't have an account?{' '}
                    <Link
                        to={'/register'}
                        className='font-semibold text-[#64748B] hover:text-[#475569]'
                    >
                        Register
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default Login;