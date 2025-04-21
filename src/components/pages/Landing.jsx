import React from "react";
import RandomProblem from "../landingPage/RandomProblem";
import CalendarComponent from "../landingPage/Calendar";
import ComplRate from "../landingPage/ComplRate";
import ProblemProvider from "../../context/ProblemContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-gray-100">
      <div className="flex-grow">
        <div className="text-center py-12">
          <h1 className="text-5xl font-extrabold tracking-tight text-blue-600 mb-4">
            Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">AceAssignments</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Your one-stop solution for tracking, managing, and acing all your assignments with ease.
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 py-3 px-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">Problems of the day</h2>
              <button className="text-white hover:text-gray-200" onClick={() => navigate("/problems")}>
                <FontAwesomeIcon icon={faExpand} />
              </button>
            </div>
            <div className="p-4">
              <ProblemProvider>
                <RandomProblem />
              </ProblemProvider>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-green-600 py-3 px-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">Assignment Calendar</h2>
              <button className="text-white hover:text-gray-200" onClick={() => navigate("/add-event")}>
                <FontAwesomeIcon icon={faExpand} />
              </button>
            </div>
            <div className="p-4">
              <CalendarComponent />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 py-3 px-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">Topics</h2>
              <button className="text-white hover:text-gray-200" onClick={() => navigate("/tracker")}>
                <FontAwesomeIcon icon={faExpand} />
              </button>
            </div>
            <div className="p-4 h-120">
              <ProblemProvider>
                <ComplRate />
              </ProblemProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;