import React, {createContext, useEffect} from "react";

export const ProblemContext = createContext();

function getRandomQuestions(arr, count) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}  

export default function ProblemProvider({ children }) {
    const [problems, setProblems] = React.useState(()=>{
        let retrievedProblems = JSON.parse(localStorage.getItem("problems"))
        return retrievedProblems || [{
            title: "Two Sum",
            topic: "Arrays",
            subject: "Data Structures",
            description: "Given an array of integers, return the indices of the two numbers such that they add up to a specific target.",
            approach: "Use a hashmap to track visited numbers and their indices. For each number, check if (target - current number) exists in the map.",
            difficulty: "easy"
          },
          {
            title: "Valid Parentheses",
            topic: "Stacks",
            subject: "Data Structures",
            description: "Determine if a string of brackets is valid based on proper nesting and closure.",
            approach: "",
            difficulty: "easy"
          },
          {
            title: "Longest Substring Without Repeating Characters",
            topic: "Strings",
            subject: "Algorithms",
            description: "Find the length of the longest substring without repeating characters in a given string.",
            approach: "Use a sliding window with two pointers and a set to track unique characters. Move the left pointer when a duplicate is found.",
            difficulty: "medium"
          },
          {
            title: "Merge Intervals",
            topic: "Intervals",
            subject: "Algorithms",
            description: "Merge overlapping intervals from a list of intervals.",
            approach: "",
            difficulty: "medium"
          },
          {
            title: "Word Ladder",
            topic: "Graphs",
            subject: "Algorithms",
            description: "Find the shortest transformation sequence from start word to end word, changing one letter at a time with each transformation being a valid word.",
            approach: "",
            difficulty: "hard"
          },
          {
            title: "Detect Cycle in a Linked List",
            topic: "Linked List",
            subject: "Data Structures",
            description: "Determine if a linked list contains a cycle.",
            approach: "Use two pointers (slow and fast). If they meet, there's a cycle.",
            difficulty: "easy"
          },
          {
            title: "Kth Largest Element in an Array",
            topic: "Heap",
            subject: "Algorithms",
            description: "Find the Kth largest element in an unsorted array.",
            approach: "",
            difficulty: "medium"
          }]
    });

    const dummyProblems = [
        {
          title: "Two Sum",
          topic: "Arrays",
          subject: "Data Structures",
          description: "Given an array of integers, return the indices of the two numbers such that they add up to a specific target.",
          approach: "Use a hashmap to track visited numbers and their indices. For each number, check if (target - current number) exists in the map.",
          difficulty: "easy"
        },
        {
          title: "Valid Parentheses",
          topic: "Stacks",
          subject: "Data Structures",
          description: "Determine if a string of brackets is valid based on proper nesting and closure.",
          approach: "",
          difficulty: "easy"
        },
        {
          title: "Longest Substring Without Repeating Characters",
          topic: "Strings",
          subject: "Algorithms",
          description: "Find the length of the longest substring without repeating characters in a given string.",
          approach: "Use a sliding window with two pointers and a set to track unique characters. Move the left pointer when a duplicate is found.",
          difficulty: "medium"
        },
        {
          title: "Merge Intervals",
          topic: "Intervals",
          subject: "Algorithms",
          description: "Merge overlapping intervals from a list of intervals.",
          approach: "",
          difficulty: "medium"
        },
        {
          title: "Word Ladder",
          topic: "Graphs",
          subject: "Algorithms",
          description: "Find the shortest transformation sequence from start word to end word, changing one letter at a time with each transformation being a valid word.",
          approach: "",
          difficulty: "hard"
        },
        {
          title: "Detect Cycle in a Linked List",
          topic: "Linked List",
          subject: "Data Structures",
          description: "Determine if a linked list contains a cycle.",
          approach: "Use two pointers (slow and fast). If they meet, there's a cycle.",
          difficulty: "easy"
        },
        {
          title: "Kth Largest Element in an Array",
          topic: "Heap",
          subject: "Algorithms",
          description: "Find the Kth largest element in an unsorted array.",
          approach: "",
          difficulty: "medium"
        },
    ];

    useEffect(() => {
        setProblems((prevProblems) => [...prevProblems, ...dummyProblems]);
    }, []);

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
    }, [problems]);

    const updateProblem = (index, updatedProblem) => {
        if (!updatedProblem.description || updatedProblem.description.trim() === "") {
            const userDescription = prompt("Please enter a description for this problem:");
            if (userDescription) {
                updatedProblem.description = userDescription.trim();
            } else {
                alert("Description is required to update the problem.");
                return;
            }
        }

        setProblems((prevProblems) => {
            const newProblems = [...prevProblems];
            newProblems[index] = updatedProblem;
            localStorage.setItem("problems", JSON.stringify(newProblems));
            return newProblems;
        });
    };

    return (
        <ProblemContext.Provider value={{ randomProblem, problems, addProblem, groupedByTopic, numQuestionsPerTopic, updateProblem }}>
            {children}
        </ProblemContext.Provider>
    )
}