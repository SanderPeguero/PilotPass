import React, { useState } from "react";
import { NavLink } from "react-router-dom";

//utils
import Loader from "../utils/Loader";
import Alert from '../utils/Snackbar';

//contexts
import { useContextPilotPass } from "../contexts/Context";

const QuizList = () => {
    const { loading, error, response } = useContextPilotPass();
    const [filter, setFilter] = useState('All Courses');
    const [selectedCourse, setSelectedCourse] = useState(null); // null means "Courses View", string means "Modules View"

    const calculateCourseStats = (courseName) => {
        const quizlist = response[courseName];
        if (!quizlist) return { totalQuizzes: 0, totalQuestions: 0 };

        let totalQuizzes = 0;
        let totalQuestions = 0;

        Object.values(quizlist).forEach(quizData => {
            if (quizData && typeof quizData === 'object') {
                totalQuizzes++;
                totalQuestions += (quizData.preguntas ? quizData.preguntas.length : 0);
            }
        });

        return { totalQuizzes, totalQuestions };
    };

    const renderCourseCards = () => {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.keys(response).map((course) => {
                    const stats = calculateCourseStats(course);
                    const progress = Math.floor(Math.random() * 100); // Mock progress for UI

                    // We try to get an image from the first quiz, or use a default one
                    let courseImage = "https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                    const firstQuizId = Object.keys(response[course])[0];
                    if (firstQuizId && response[course][firstQuizId] && response[course][firstQuizId].imagen) {
                        courseImage = response[course][firstQuizId].imagen;
                    }

                    return (
                        <div
                            key={course}
                            onClick={() => setSelectedCourse(course)}
                            className="cursor-pointer block group"
                        >
                            <div className="bg-gray-800 border border-gray-700/60 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 flex flex-col h-full shadow-lg hover:shadow-blue-500/10">
                                <div className="relative h-48 w-full bg-gray-700">
                                    <img
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                                        src={courseImage}
                                        alt={course}
                                    />
                                    <div className="absolute top-3 left-3 bg-gray-900/80 backdrop-blur-sm text-xs text-blue-400 px-3 py-1 rounded-full border border-blue-500/20 font-medium capitalize">
                                        Course
                                    </div>
                                </div>

                                <div className="p-5 flex-grow flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-100 mb-2 leading-tight capitalize">
                                            {course}
                                        </h3>
                                        <p className="text-sm text-gray-400 mb-4">
                                            {stats.totalQuestions} Questions • {stats.totalQuizzes} Modules
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between text-xs text-gray-300 mb-1">
                                            <span>Overall Progress</span>
                                            <span className="font-semibold">{progress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                                                style={{ width: `${progress}%` }}
                                            ></div>
                                        </div>
                                        <div className="pt-3">
                                            <button className="w-full bg-gray-700 hover:bg-blue-600 text-white font-medium py-2.5 rounded-xl transition-colors duration-200">
                                                View Modules
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const renderQuizList = (course) => {
        const quizlist = response[course];
        if (!quizlist) return null;

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.keys(quizlist).map((quiz) => {
                    const quizData = quizlist[quiz];
                    if (quizData && typeof quizData === 'object') {
                        const totalQuestions = quizData.preguntas ? quizData.preguntas.length : 0;
                        const progress = Math.floor(Math.random() * 100); // Mock progress for UI
                        return (
                            <NavLink
                                key={quiz}
                                to={`/quiz/${course}/${quiz}`}
                                className="block group"
                            >
                                <div className="bg-gray-800 border border-gray-700/60 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 flex flex-col h-full shadow-lg hover:shadow-blue-500/10">
                                    <div className="relative h-48 w-full bg-gray-700">
                                        <img
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                                            src={quizData.imagen || "https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                                            alt={quizData.subject}
                                        />
                                        <div className="absolute top-3 left-3 bg-gray-900/80 backdrop-blur-sm text-xs text-blue-400 px-3 py-1 rounded-full border border-blue-500/20 font-medium">
                                            Module
                                        </div>
                                    </div>

                                    <div className="p-5 flex-grow flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-100 mb-2 leading-tight">
                                                {quizData.subject}
                                            </h3>
                                            <p className="text-sm text-gray-400 mb-4">
                                                {totalQuestions} Questions
                                            </p>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex justify-between text-xs text-gray-300 mb-1">
                                                <span>Progress</span>
                                                <span className="font-semibold">{progress}%</span>
                                            </div>
                                            <div className="w-full bg-gray-700 rounded-full h-2">
                                                <div
                                                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                                                    style={{ width: `${progress}%` }}
                                                ></div>
                                            </div>
                                            <div className="pt-3">
                                                <button className="w-full bg-gray-700 hover:bg-blue-600 text-white font-medium py-2.5 rounded-xl transition-colors duration-200">
                                                    Start Module
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                        );
                    }
                    return null;
                })}
            </div>
        );
    };

    if (loading || !response) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                 <Loader />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white pb-24 md:pb-8 pt-6 px-4 md:px-8 animate-fade-in-up">
            {error && <Alert severity={5} title={"Error"} detail={error} />}
            
            <div className="max-w-7xl mx-auto">
                {selectedCourse ? (
                    // Modules View
                    <>
                        <button
                            onClick={() => setSelectedCourse(null)}
                            className="mb-6 flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                            Back to Courses
                        </button>
                        <header className="mb-8">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-2 capitalize">{selectedCourse}</h1>
                            <p className="text-gray-400">Select a module to continue your study.</p>
                        </header>
                        <section>
                            {renderQuizList(selectedCourse)}
                        </section>
                    </>
                ) : (
                    // Courses View
                    <>
                        <header className="mb-8">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-2">My Courses</h1>
                            <p className="text-gray-400">Continue your aviation training and track your progress.</p>
                        </header>

                        {/* Filters */}
                        <div className="flex space-x-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                            {['All Courses', 'In Progress', 'Completed'].map(f => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                                        filter === f
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                        : 'bg-gray-800 text-gray-400 hover:text-gray-200 hover:bg-gray-700 border border-gray-700'
                                    }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>

                        <section>
                            {renderCourseCards()}
                        </section>
                    </>
                )}
            </div>
        </div>
    );
};

export default QuizList;
