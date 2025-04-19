import React from "react";

export default function Problem({ problem }) {
    return (
        <div className="flex justify-around p-4 border rounded-lg shadow-md bg-gray-100">
            <div className="font-bold text-lg text-blue-600">{problem.name}</div>
            <div className="text-gray-700 italic">{problem.topic}</div>
        </div>
    );
}