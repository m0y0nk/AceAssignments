import React, { useContext } from 'react';
import RandomProblem from '../landingPage/RandomProblem';
import ProblemProvider from '../../context/ProblemContext';
import CalendarComponent from '../landingPage/Calendar';
import ComplRate from '../landingPage/ComplRate';
// import { ProblemContext } from '../../context/ProblemContext';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      {/* Hero Section */}
      <div className="pt-16 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-blue-600 mb-6">
            Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">AceAssignments</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Your one-stop solution for tracking, managing, and acing all your assignments with ease.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <ProblemProvider>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Random Problem */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 py-3 px-4">
                <h2 className="text-lg font-semibold text-white">Random Problem</h2>
              </div>
              <div className="p-6">
                <RandomProblem />
              </div>
            </div>

            {/* Card 2: Calendar */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="bg-gradient-to-r from-green-500 to-green-600 py-3 px-4">
                <h2 className="text-lg font-semibold text-white">Assignment Calendar</h2>
              </div>
              <div className="p-6">
                <CalendarComponent />
              </div>
            </div>

            {/* Card 3: Completion Rate */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 py-3 px-4">
                <h2 className="text-lg font-semibold text-white">Completion Rate</h2>
              </div>
              <div className="p-6">
                <ComplRate />
              </div>
            </div>
          </div>
        </ProblemProvider>

        {/* Feature Highlights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Track Your Progress</h3>
            </div>
            <p className="text-gray-600">
              Monitor your assignment completion and track your progress over time with intuitive visualization tools.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Never Miss a Deadline</h3>
            </div>
            <p className="text-gray-600">
              Stay on top of your deadlines with our calendar view and get timely reminders for upcoming assignments.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} AceAssignments. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;