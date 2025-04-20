import React, { useContext } from "react";
import { ProblemContext } from "../../context/ProblemContext";

export default function ComplRate() {
    const { numQuestionsPerTopic } = useContext(ProblemContext);

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <ul style={{ listStyleType: "none", padding: 0 }}>
                {
                    Object.keys(numQuestionsPerTopic).map((topic, index) => (
                        <li 
                          key={index} 
                          style={{ 
                            margin: "10px 0", 
                            padding: "15px", 
                            border: "1px solid #4CAF50", 
                            borderRadius: "8px", 
                            backgroundColor: "#e8f5e9", 
                            display: "flex", 
                            justifyContent: "space-between", 
                            alignItems: "center" 
                          }}
                        >
                          <span style={{ fontWeight: "bold", fontSize: "16px" }}>{topic}</span>
                          <span style={{ fontSize: "14px", color: "#388E3C" }}>
                            {numQuestionsPerTopic[topic]} {numQuestionsPerTopic[topic] ? "question" : "questions" }
                          </span>
                        </li>
                      ))
                }
            </ul>
        </div>
    );
}