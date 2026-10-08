import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
    {
        name: 'Tests',
        path: '/',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    },
    {
        name: 'Exams',
        path: '/exams',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
        )
    },
    {
        name: 'World',
        path: '/worldchat',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
        )
    },
    {
        name: 'Dev',
        path: '/devchat',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
            </svg>
        )
    }
];

const Sidebar = ({ isAuthenticated }) => {
    if (!isAuthenticated) return null;

    return (
        <>
            {/* Desktop Sidebar */}
            <nav className="hidden md:flex flex-col fixed top-0 left-0 w-64 h-full bg-gray-800 border-r border-gray-700/50 z-50 transition-transform duration-300">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-white tracking-wider flex items-center gap-2">
                        <span className="text-blue-500">Pilot</span>Pass
                    </h2>
                </div>

                <ul className="flex-1 px-4 space-y-2 mt-4">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <NavLink
                                to={item.path}
                                className={({isActive}) => `
                                    flex items-center gap-4 px-4 py-3 rounded-xl transition-colors duration-200
                                    ${isActive
                                        ? 'bg-blue-600/10 text-blue-500 font-semibold'
                                        : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'}
                                `}
                            >
                                <span className="flex items-center justify-center w-6 h-6">{item.icon}</span>
                                <span>{item.name}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 w-full bg-gray-800/90 backdrop-blur-md border-t border-gray-700/50 z-50">
                <ul className="flex justify-around items-center h-16 px-2">
                    {navItems.map((item) => (
                        <li key={item.name} className="flex-1">
                            <NavLink
                                to={item.path}
                                className={({isActive}) => `
                                    flex flex-col items-center justify-center w-full h-full gap-1 transition-colors duration-200
                                    ${isActive ? 'text-blue-500' : 'text-gray-400'}
                                `}
                            >
                                <span className="flex items-center justify-center w-6 h-6">{item.icon}</span>
                                <span className="text-[10px] font-medium">{item.name}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
};

export default Sidebar;
