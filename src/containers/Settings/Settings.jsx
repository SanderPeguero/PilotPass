import React from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import Navbar from '../../New Structure/utils/Navbar';
import classes from '../../styles/Settings.module.css'; // Let's create this

const Settings = () => {
    const { isExamSimulation, setIsExamSimulation } = useSettings();

    const handleToggle = () => {
        setIsExamSimulation(!isExamSimulation);
    };

    return (
        <>
            <Navbar className="mt-[-4rem] z-[1]" />
            <div className="flex flex-col items-center justify-center h-full w-full p-8" style={{ marginTop: '2rem' }}>
                <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

                <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg max-w-lg w-full flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-white">Exam Simulation Mode</h2>
                        <p className="text-gray-400 mt-2 text-sm">
                            When enabled, answers are not revealed immediately, and your final score is only shown at the end of the exam.
                        </p>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={isExamSimulation}
                            onChange={handleToggle}
                        />
                        <div className="w-14 h-7 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                </div>
            </div>
        </>
    );
};

export default Settings;
