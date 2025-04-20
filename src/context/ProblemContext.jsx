import React, {createContext} from "react";

export const ProblemContext = createContext();

function getRandomQuestions(arr, count) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}  

export default function ProblemProvider({ children }) {
    const [problems, setProblems] = React.useState(()=>{
        let retrievedProblems = JSON.parse(localStorage.getItem("problems"))
        return retrievedProblems || []
    });

    const addProblem = (problem) => {
        setProblems((prevProblems) => {
            const updatedProblems = [...prevProblems, problem];
            localStorage.setItem("problems", JSON.stringify(updatedProblems));
            return updatedProblems;
        });
    }

    const groupedByTopic = problems.reduce((acc, problem) => {
        const topic = problem.topic;
        if (!acc[topic]) {
            acc[topic] = [];
        }
        acc[topic].push(problem);
        return acc;
    }
    , {});

    const numQuestionsPerTopic = Object.keys(groupedByTopic).reduce((acc, topic) => {
        acc[topic] = groupedByTopic[topic].length;
        return acc;
    }, {});

    const [randomProblem, setRandomProblem] = React.useState([]);

    React.useEffect(() => {
        const randomQuestions = getRandomQuestions(problems, 3);
        setRandomProblem(randomQuestions);
    }, []);

    const updateProblem = (index, updatedProblem) => {
        setProblems((prevProblems) => {
          const newProblems = [...prevProblems];
          newProblems[index] = updatedProblem;
          return newProblems;
        });
      };

    return (
        <ProblemContext.Provider value={{ randomProblem, problems, addProblem, groupedByTopic, numQuestionsPerTopic, updateProblem }}>
            {children}
        </ProblemContext.Provider>
    )
}