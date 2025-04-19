import React from "react";

export default function SearchBar() {
    return (
        <div className="flex items-center justify-center">
            <input
                type="text"
                placeholder="Search Problem..."
                className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}