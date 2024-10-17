import React, { useState } from 'react'
import "../App.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [form, setForm] = useState({ policeID: '', password: '' });
    const Navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.policeID === '' || form.password === '') {
            alert('Please fill all fields');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/login', {
                policeID: form.policeID,
                password: form.password
            });

            console.log('Login response:', response.data);

            if (response.data.success) {
                alert('Logged in successfully');
                // Store the JWT token
                const token = response.data.token
                const role = response.data.role
                const id = response.data.id
                localStorage.setItem('role', role);
                localStorage.setItem('token', token);
                localStorage.setItem('id', id);
                // Redirect the user to the search page
                Navigate(`/search/${token}`);
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Incorrect credentials. Please try again.');
        }
    };

    return (
        <>
            <div>
                <Link to="/">
                    <i className='absolute z-10 bg-[#58C858] text-[#224420] top-5 left-5 p-3 rounded-lg cursor-pointer'><i class="fa-solid fa-arrow-left mr-3"></i>Back</i>
                </Link>
            </div>
            <section className="bg-black animate-fadeInUp">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a
                        href="#"
                        className="flex items-center mb-6 text-3xl font-bold text-[#58C858] text-shadow-glow"
                    >
                        CrimBase
                    </a>

                    <div className="w-full bg-[#224420] border-[#224420] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-[#58C858] md:text-2xl">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-[#58C858]">Police station ID</label>
                                    <input type="text" name="policeID" onChange={(e) => handleChange(e)} value={form.policeID} id="police-id" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="police station ID" required="">
                                    </input>
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-[#58C858]"
                                    >
                                        Your password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            onChange={(e) => handleChange(e)}
                                            value={form.password}
                                            id="password"
                                            required="true"
                                            placeholder='password'
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-white"
                                        >
                                            {showPassword ? (
                                                <i class="fa-solid fa-eye-slash"></i>
                                            ) : (
                                                <i class="fa-solid fa-eye"></i>
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <button type="submit" onClick={(e) => handleSubmit(e)} className="w-full text-[black] bg-[#58C858] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login
