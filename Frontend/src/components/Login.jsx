import React, {useState} from 'react'
import "../App.css";
import { Link } from 'react-router-dom';

const Login = () => {
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div>
                <Link to="/">
                    <i className='animate-fadeIn absolute z-10 bg-[#58C858] text-[#224420] top-5 left-5 p-3 rounded-lg cursor-pointer'><i class="fa-solid fa-arrow-left mr-3"></i>Back</i>
                </Link>
            </div>
            <section className="bg-black animate-fadeIn">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a
                        href="#"
                        className="flex items-center mb-6 text-3xl font-bold text-[#58C858]"
                        style={{
                            textShadow: 'rgba(88, 200, 88, 0.8) 0px 0px 15px, rgba(88, 200, 88, 0.8) 0px 0px 15px'
                        }}
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
                                    <input type="text" name="police-id" id="police-id" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="police station ID" required="">
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
                                            id="password"
                                            required="true"
                                            placeholder='password'
                                            value={password}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            onChange={(e) => setPassword(e.target.value)}
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
                                <button type="submit" className="w-full text-[black] bg-[#58C858] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login
