import React, { useState, useEffect } from 'react';
import RandomProblem from '../landingPage/RandomProblem';
import ProblemProvider from '../../context/ProblemContext';
import CalendarComponent from '../landingPage/Calendar';
import ComplRate from '../landingPage/ComplRate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
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

      <div className="max-w-6xl mx-auto px-4 pb-20">
        <ProblemProvider>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 py-3 px-4 flex justify-between">
                <h2 className="text-lg font-semibold text-white">Random Problem</h2>
                <FontAwesomeIcon
                  icon={faExpand}
                  onClick={() => navigate('/problems')}
                />
              </div>
              <div className="p-6">
                {isLoading ? (
                  <Skeleton height={80} />
                ) : (
                  <RandomProblem />
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="bg-gradient-to-r from-green-500 to-green-600 py-3 px-4 flex justify-between">
                <h2 className="text-lg font-semibold text-white">Assignment Calendar</h2>
                <FontAwesomeIcon
                  icon={faExpand}
                  onClick={() => navigate('/goalsetter')}
                />
              </div>
              <div className="p-6">
                {isLoading ? (
                  <Skeleton height={80} />
                ) : (
                  <CalendarComponent />
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 py-3 px-4 flex justify-between">
                <h2 className="text-lg font-semibold text-white">Completion Rate</h2>
                <FontAwesomeIcon
                  icon={faExpand}
                  onClick={() => navigate('/tracker')}
                />
              </div>
              <div className="p-6">
                {isLoading ? (
                  <Skeleton height={80} />
                ) : (
                  <ComplRate />
                )}
              </div>
            </div>
          </div>
        </ProblemProvider>
      </div>

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