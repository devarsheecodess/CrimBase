import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [activeButton, setActiveButton] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [role, setRole] = useState(localStorage.getItem('role'));

    const handleLogout = () => {
        const cf = window.confirm('Are you sure you want to logout?');
        if (!cf) return;
        localStorage.clear();
        alert('Logged out successfully');
        window.location.href = '/';
    }

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    }

    return (
        <div>
            <header className="text-white  body-font bg-[#224420]">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <a className="flex title-font font-bold items-center text-[#86EFAC] ml-10 mb-4 md:mb-0">
                        <h1 className="ml-3 text-xl text-shadow-glow">CrimBase</h1>
                    </a>
                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                        <Link to={`/search/${token}`}>
                            <i className={`font-medium not-italic mr-12 hover:text-green-400 cursor-pointer hover:underline underline-offset-4 ${activeButton === 'search' ? 'text-shadow-glow underline' : ''}`} onClick={() => handleButtonClick('search')}>Search</i>
                        </Link>
                        <Link to={`/addCriminal/${token}`}>
                            <i className={`font-medium not-italic mr-12 hover:text-green-400 cursor-pointer hover:underline underline-offset-4 ${activeButton === 'addCriminal' ? 'text-shadow-glow underline' : ''}`} onClick={() => handleButtonClick('addCriminal')}>Add Criminal</i>
                        </Link>
                        <Link to={`/fingerprint/${token}`}>
                            <i className={`font-medium not-italic mr-12 hover:text-green-400 cursor-pointer hover:underline underline-offset-4 ${activeButton === 'fingerprint' ? 'text-shadow-glow underline' : ''}`} onClick={() => handleButtonClick('fingerprint')}>Fingerprint</i>
                        </Link>
                        <Link to={`/dna/${token}`}>
                            <i className={`font-medium not-italic mr-12 hover:text-green-400 cursor-pointer hover:underline underline-offset-4 ${activeButton === 'dna' ? 'text-shadow-glow underline' : ''}`} onClick={() => handleButtonClick('dna')}>DNA</i>
                        </Link>
                        <Link to={`/face/${token}`}>
                            <i className={`font-medium not-italic mr-12 hover:text-green-400 cursor-pointer hover:underline underline-offset-4 ${activeButton === 'face' ? 'text-shadow-glow underline' : ''}`} onClick={() => handleButtonClick('face')}>Face</i>
                        </Link>
                        {
                            (role === "admin") ? (
                                <Link to={`/grant-access/${token}`}>
                                    <i className={`not-italic cursor-pointer hover:bg-green-400 hover:text-green-800 bg-white text-black p-3 rounded-lg mr-12 ${activeButton === 'grantAccess' ? 'text-shadow-glow underline' : ''}`} onClick={() => handleButtonClick('grantAccess')}>Add access</i>
                                </Link>
                            ) : null
                        }
                        <i className="mr-12 hover:text-green-400 hover:text-shadow-glow cursor-pointer hover:underline underline-offset-4" onClick={handleLogout}>
                            <i className="fa-solid fa-right-from-bracket text-white hover:text-green-400 text-2xl"></i>
                        </i>
                    </nav>
                </div>
            </header>
        </div>
    )
}

export default Header;