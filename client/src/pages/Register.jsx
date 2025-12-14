import React, { useState } from 'react';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
// import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const valideValue = Object.values(data).every((el) => el);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.password !== data.confirmPassword) {
            toast.error('Password and confirm password must be the same');
            return;
        }

        try {
            const response = await Axios({
                url: "http://localhost:4000/api/user/register",
                method: "POST",
                data: data,
            });

            if (response.data.error) {
                toast.error(response.data.message);
            }

            if (response.data.success) {
                toast.success(response.data.message);
                setData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                });
                navigate('/login');
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        <section className='w-full container mx-auto px-2'>
            <div className='bg-[#F8FAFC] my-4 w-full max-w-lg mx-auto rounded-lg shadow-lg p-7'>
                <p className='text-xl font-semibold text-gray-700'>Welcome to CampusKart</p>

                <form className='grid gap-4 mt-6' onSubmit={handleSubmit}>
                    <div className='grid gap-1'>
                        <label htmlFor='name' className='text-gray-700 font-medium'>
                            Name:
                        </label>
                        <input
                            type='text'
                            id='name'
                            autoFocus
                            className='bg-gray-100 p-2 border rounded outline-none focus:border-[#64748B]'
                            name='name'
                            value={data.name}
                            onChange={handleChange}
                            placeholder='Enter your name'
                        />
                    </div>
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
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='confirmPassword' className='text-gray-700 font-medium'>
                            Confirm Password:
                        </label>
                        <div className='bg-gray-100 p-2 border rounded flex items-center focus-within:border-[#64748B]'>
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id='confirmPassword'
                                className='w-full outline-none bg-gray-100'
                                name='confirmPassword'
                                value={data.confirmPassword}
                                onChange={handleChange}
                                placeholder='Enter your confirm password'
                            />
                            <div
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                className='cursor-pointer text-gray-600'
                            >
                                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                            </div>
                        </div>
                    </div>

                    <button
                        disabled={!valideValue}
                        className={`text-white py-2 rounded-lg font-semibold my-3 tracking-wide transition-all 
                            ${valideValue ? 'bg-[#27667B] hover:bg-[#1E4F5F]' : 'bg-[#27667B] cursor-not-allowed'}`}
                    >
                        Register
                    </button>
                </form>

                <p className='text-gray-700'>
                    Already have an account?{' '}
                    <Link to={'/login'} className='font-semibold text-[#64748B] hover:text-[#475569]'>
                        Login
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default Register;
