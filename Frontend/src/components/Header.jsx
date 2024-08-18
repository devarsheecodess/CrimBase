import React, {useState} from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
    const [role, setRole] = useState(localStorage.getItem('role'));
    const [token, setToken] = useState(localStorage.getItem('token'));

    const handleLogout = () => {
        const cf = window.confirm('Are you sure you want to logout?');
        if (!cf) return;
        localStorage.clear();
        alert('Logged out successfully');
        window.location.href = '/';
    }

    return (
        <div>
            <header class="text-white body-font bg-[#224420]">
                <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <a class="flex title-font font-bold items-center text-[#86EFAC] mb-4 md:mb-0">
                        <h1 class="ml-3 text-xl">CrimBase</h1>
                    </a>
                    <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
                        <Link to={`/search/${token}`}><i class="font-medium not-italic mr-12 hover:text-green-400 cursor-pointer hover:underline underline-offset-4">Search</i></Link>
                        <Link to={`/addCriminal/${token}`}><i class="font-medium not-italic mr-12 hover:text-green-400 cursor-pointer hover:underline underline-offset-4">Add Criminal</i></Link>
                        <Link to={`/fingerprint/${token}`}><i class="font-medium not-italic mr-12 hover:text-green-400 cursor-pointer hover:underline underline-offset-4">Fingerprint</i></Link>
                        <Link to={`/dna/${token}`}><i class="font-medium not-italic mr-12 hover:text-green-400 cursor-pointer hover:underline underline-offset-4">DNA</i></Link>
                        <Link to={`/face/${token}`}><i class="font-medium not-italic mr-12 hover:text-green-400 cursor-pointer hover:underline underline-offset-4">Face</i></Link>
                        {
                            (role === "admin") ? (
                                <Link to={`/grant-access/${token}`}>
                                    <i className='not-italic cursor-pointer bg-white text-black p-3 rounded-lg mr-12'>Add access</i>
                                </Link>
                            ) : null
                        }
                        <i class="mr-12 hover:text-green-400 cursor-pointer hover:underline underline-offset-4" onClick={()=>handleLogout()}><i class="fa-solid fa-right-from-bracket text-white hover:text-green-400 text-2xl"></i></i>
                    </nav>
                </div>
            </header>
        </div>
    )
}

export default Header
