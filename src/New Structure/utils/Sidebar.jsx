import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
    { name: 'Tests', path: '/', icon: '✈️' },
    { name: 'Exams', path: '/exams', icon: '📝' },
    { name: 'Settings', path: '/config', icon: '⚙️' },
    { name: 'World', path: '/worldchat', icon: '🌍' },
    { name: 'Dev', path: '/devchat', icon: '👨‍💻' },
    { name: 'Log Out', path: '/logout', icon: '🚪' },
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
                                <span className="text-xl">{item.icon}</span>
                                <span>{item.name}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 w-full bg-gray-800/90 backdrop-blur-md border-t border-gray-700/50 z-50">
                <ul className="flex justify-around items-center h-16 px-2">
                    {navItems.slice(0, 4).map((item) => (
                        <li key={item.name} className="flex-1">
                            <NavLink
                                to={item.path}
                                className={({isActive}) => `
                                    flex flex-col items-center justify-center w-full h-full gap-1 transition-colors duration-200
                                    ${isActive ? 'text-blue-500' : 'text-gray-400'}
                                `}
                            >
                                <span className="text-xl">{item.icon}</span>
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
