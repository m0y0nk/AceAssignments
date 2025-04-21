import React, { useContext, useState } from "react";
import { ProblemContext } from "../../context/ProblemContext";
import Problem from "../../helper/Problem";

export default function RandomProblem() {
  const { randomProblem } = useContext(ProblemContext);
  const [infoMessage, setInfoMessage] = useState("");

  const handleClick = (title) => {
    setInfoMessage(`🔍 Search for "${title}" in Problems Page`);
    setTimeout(() => setInfoMessage(""), 4000);
  };

  return (
    <div className="max-h-64 space-y-4"  style={{ padding: "20px", fontFamily: "Arial, sans-serif", maxHeight: "400px", overflowY: "auto" }}>
      {infoMessage && (
        <div className="p-3 bg-blue-100 text-blue-800 rounded-lg shadow-sm">
          {infoMessage}
        </div>
      )}

      {randomProblem.map((problem, index) => (
        <div
          key={index}
          className="p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => handleClick(problem.title)}
        >
          <Problem problem={problem} />
        </div>
      ))}
    </div>
  );
}
