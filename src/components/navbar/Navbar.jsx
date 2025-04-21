import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
import SearchQueryProvider from "../../context/SearchQuery.jsx";
import './Navbar.css';
// import Logo from "../logo/Logo";

export default function Navbar() {
  return (
    <>
      <nav className="flex items-center justify-between w-full px-8 py-4 bg-white shadow-md">
        <div className="text-2xl font-bold text-gray-800">
          {/* <Logo /> */}
          logo..
        </div>

        <div className="flex items-center space-x-8">
          <div className="">
              <SearchQueryProvider>
                <SearchBar />
              </SearchQueryProvider>
          </div>

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
              to="/goalsetter"
              className="text-gray-700 hover:text-blue-600 transition duration-200"
            >
              Goal Setter
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
