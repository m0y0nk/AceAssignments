import React, { useContext } from "react";
import { ProblemContext } from "../../context/ProblemContext";

export default function ComplRate() {
    const { numEachSubject } = useContext(ProblemContext);

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h2 style={{ textAlign: "center", color: "#4CAF50" }}>Completion Rate</h2>
            <ul style={{ listStyleType: "none", padding: 0 }}>
                {
                    numEachSubject.map((subject, index) => (
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
                            <span style={{ fontWeight: "bold", fontSize: "16px" }}>{subject.subject}</span>
                            <span style={{ fontSize: "14px", color: "#388E3C" }}>
                                {subject.num} questions completed
                            </span>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}