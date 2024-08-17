import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
    return (
        <div>
            <header>
                <nav className="bg-[#224420] border-gray-200 px-4 lg:px-6 py-2.5 ">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <a className="flex items-center">
                            <span className="self-center text-xl font-semibold whitespace-nowrap text-[#86EFAC]">CrimBase</span>
                        </a>
                        <div className="flex items-center lg:order-2">
                            <Link to="/login">
                                <a className="cursor-pointer text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Log in</a>
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>

            <div>
                <h1 className="text-3xl text-white font-bold text-center mt-60 animate-fadeInUp">Welcome To CrimBase!</h1>
            </div>
        </div>
    )
}

export default Landing
