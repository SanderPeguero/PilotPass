import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useContextPilotPass } from '../contexts/Context';

const Navbar = () => {
    const { name } = useContextPilotPass();
    const [scrolled, setScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className={`
            fixed top-0 right-0 left-0 md:left-64 h-20 flex items-center justify-between px-4 md:px-8 z-40 transition-all duration-300
            ${scrolled ? 'bg-gray-900/90 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'}
        `}>
            {/* Mobile Title (Optional, hidden on md) */}
            <div className="md:hidden">
                <h2 className="text-xl font-bold text-white tracking-wider flex items-center gap-2">
                    <span className="text-blue-500">Pilot</span>Pass
                </h2>
            </div>

            {/* Desktop Search */}
            <div className="hidden md:flex items-center gap-4">
                <div className="relative text-gray-500">
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

            <div className="flex items-center gap-4 md:gap-6 relative" ref={dropdownRef}>
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-white">
                        Welcome, {name ? name.split(" ")[0] : "Cadet"}
                    </p>
                    <p className="text-xs text-blue-400">Student Pilot - Active</p>
                </div>

                {/* Profile Dropdown Trigger */}
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold border-2 border-gray-800 ring-2 ring-blue-500/30 cursor-pointer hover:ring-blue-500/60 transition-all focus:outline-none"
                >
                    {name ? name.charAt(0).toUpperCase() : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                          <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                        </svg>
                    )}
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                    <div className="absolute top-14 right-0 w-48 bg-gray-800 border border-gray-700 rounded-xl shadow-xl py-2 animate-fade-in-up origin-top-right z-50">
                        <NavLink
                            to="/config"
                            onClick={() => setDropdownOpen(false)}
                            className={({isActive}) => `flex items-center gap-3 px-4 py-2 text-sm transition-colors ${isActive ? 'bg-blue-600/10 text-blue-500' : 'text-gray-200 hover:bg-gray-700'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Settings
                        </NavLink>

                        <div className="border-t border-gray-700 my-1"></div>

                        <NavLink
                            to="/logout"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                            </svg>
                            Log Out
                        </NavLink>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;
