import React, { useState, useEffect } from 'react';
import { useContextPilotPass } from '../contexts/Context';

const Navbar = () => {
    const { name } = useContextPilotPass();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`
            hidden md:flex fixed top-0 right-0 left-64 h-20 items-center justify-between px-8 z-40 transition-all duration-300
            ${scrolled ? 'bg-gray-900/80 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'}
        `}>
            <div className="flex items-center gap-4">
                <div className="relative hidden lg:block text-gray-500">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Search courses, exams..."
                        className="bg-gray-800 border border-gray-700 text-white text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-64 pl-10 p-2.5 outline-none transition-colors placeholder-gray-500"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-white">
                        Welcome, {name ? name.split(" ")[0] : "Cadet"}
                    </p>
                    <p className="text-xs text-blue-400">Student Pilot - Active</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold border-2 border-gray-800 ring-2 ring-blue-500/30">
                    {name ? name.charAt(0).toUpperCase() : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                          <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                        </svg>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
