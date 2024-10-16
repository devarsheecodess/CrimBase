import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-[#1e3a8a] to-[#4c1d95]">
            <section className="py-8 px-4 mx-auto max-w-screen-xl">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-9xl tracking-tight font-extrabold text-primary-600 text-[#86EFAC]">404</h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-red-400">Something's missing.</p>
                    <p className="mb-8 text-lg font-light text-white">Sorry, we can't find that page. You'll find lots to explore on the home page.</p>
                    <Link to={`/`}>
                        <button className="inline-flex items-center justify-center text-white bg-[#224420] hover:bg-[#1f3b1a] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-6 py-3 transition duration-300 ease-in-out">
                            Back to Homepage
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Error;
