import React, {createContext} from "react";

export const ProblemContext = createContext();

export default function ProblemProvider({ children }) {
    const randomProblem = [
        {
            id: 1,
            name: "Problem 1",
            topic: "Topic 1"
        },
        {
            id: 2,
            name: "Problem 2",
            topic: "Topic 2"
        },
        {
            id: 3,
            name: "Problem 3",
            topic: "Topic 3"
        }
    ];

    const numEachSubject = [{
        subject: "Math",
        num: 10
    },
    {
        subject: "Science",
        num: 5
    },
    {
        subject: "English",
        num: 8
    },
    {
        subject: "History",
        num: 6
    },
    {
        subject: "Geography",
        num: 7
    }
];

    return (
        <ProblemContext.Provider value={{ randomProblem, numEachSubject }}>
            {children}
        </ProblemContext.Provider>
    )
}