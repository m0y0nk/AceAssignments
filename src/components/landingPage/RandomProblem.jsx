import React from "react";
import { useContext } from "react";
import { ProblemContext } from "../../context/ProblemContext";
import Problem from "../../helper/Problem";

export default function RandomProblem() {
  const { randomProblem } = useContext(ProblemContext);

  return (
    <div className="max-h-64 space-y-4">
      {randomProblem.map((problem) => (
        <div key={problem.id} className="p-4 shadow-sm hover:shadow-md transition-shadow">
          <Problem problem={problem} />
        </div>
      ))}
    </div>
  );
}