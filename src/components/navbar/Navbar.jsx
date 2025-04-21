import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './Navbar.css';
import Logo from "../logo/logo.png";

export default function Navbar() {
  return (
    <>
      <nav className="flex items-center justify-between w-full px-8 py-4 bg-white shadow-md">
        <div className="text-2xl font-bold text-gray-800">
          <Link to="/" className="text-gray-800 hover:text-blue-600 transition duration-200">
            <img src={Logo} alt="Logo" className="h-10 w-10 inline-block mr-2" />
            AceAssignments
          </Link>
        </div>

        <div className="md:flex hidden items-center space-x-8">
          <div className="flex space-x-6 text-lg font-medium">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition duration-200"
            >
              Home
            </Link>
            <Link
              to="/problems"
              className="text-gray-700 hover:text-blue-600 transition duration-200"
            >
              Problems
            </Link>
            <Link
              to="/tracker"
              className="text-gray-700 hover:text-blue-600 transition duration-200"
            >
              Tracker
            </Link>
            <Link
              to="/add-event"
              className="text-gray-700 hover:text-blue-600 transition duration-200"
            >
              Add Event
            </Link>
          </div>
        </div>

        <div className="md:hidden flex items-center">
          <button
            className="text-gray-700 hover:text-blue-600 transition duration-200 focus:outline-none"
            onClick={() => {
              const menu = document.getElementById("mobile-menu");
              menu.classList.toggle("hidden");
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        <div
          id="mobile-menu"
          className="hidden flex flex-col space-y-4 mt-4 text-lg font-medium md:hidden"
        >
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 transition duration-200"
          >
            Home
          </Link>
          <Link
            to="/problems"
            className="text-gray-700 hover:text-blue-600 transition duration-200"
          >
            Problems
          </Link>
          <Link
            to="/tracker"
            className="text-gray-700 hover:text-blue-600 transition duration-200"
          >
            Tracker
          </Link>
          <Link
            to="/add-event"
            className="text-gray-700 hover:text-blue-600 transition duration-200"
          >
            Add Event
          </Link>
        </div>
      </nav>
    </>
  );
}
