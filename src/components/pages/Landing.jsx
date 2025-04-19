import React, { useContext } from 'react';
import RandomProblem from '../landingPage/RandomProblem';
import ProblemProvider from '../../context/ProblemContext';
import CalendarComponent from '../landingPage/Calendar';
import ComplRate from '../landingPage/ComplRate';
// import { ProblemContext } from '../../context/ProblemContext';

const LandingPage = () => {

return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
        <div className="text-center mb-10 w-full" style={{ height: '20%' }}>
            <h1 className="text-4xl font-extrabold text-blue-600 mb-4 w-4/5 mx-auto">Welcome to AceAssignments</h1>
            <p className="text-lg text-gray-700 w-4/5 mx-auto">Your one-stop solution for all your assignment needs.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 w-full" style={{ height: '80%' }}>
            <ProblemProvider>
                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
                    <RandomProblem />
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
                    <CalendarComponent />
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
                    <ComplRate />
                </div>
            </ProblemProvider>
        </div>
    </div>
);
};

export default LandingPage;