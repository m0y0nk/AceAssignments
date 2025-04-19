import React from "react";
import { useContext } from "react";
import { ProblemContext } from "../../context/ProblemContext";
import Problem from "../../helper/Problem"

export default function RandomProblem() {
    const { randomProblem } = useContext(ProblemContext);
    
    return (
        <div>
            <div>Random Problem</div>
            <div>
                {randomProblem.map((problem) => (
                    <div key={problem.id} className="p-1 m-2">
                        <Problem problem={problem}/>
                    </div>
                ))}
            </div>
        </div>
    );
}