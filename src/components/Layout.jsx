import React from "react";
import Navbar from "./navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
};

export default Layout;