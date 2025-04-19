import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { ProblemContext } from '../../context/ProblemContext';

const ProblemPage = () => {
  const [showAddQuestionPanel, setShowAddQuestionPanel] = useState(false);
  const {problems, addProblem} = useContext(ProblemContext);

  const handleAddingPanel = () => {
    setShowAddQuestionPanel(true);
  };

  const closePanel = () => {
    setShowAddQuestionPanel(false);
  };

  const [problem, setProblem] = useState({
    title: '',
    topic: '',
    subject: '',
    difficulty: 'easy',
    url: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProblem((prevProblem) => ({
      ...prevProblem,
      [name]: value
    }));
  };

  const handleSave = () => {
    addProblem(problem);
    setProblem({
      title: '',
      topic: '',
      subject: '',
      difficulty: 'easy',
      url: ''
    });
    console.log(problems);
    localStorage.setItem('problems', JSON.stringify([...problems, problem]));
    closePanel();
  };

  return (
    <div>
      <div className={`relative ${showAddQuestionPanel ? 'opacity-30 pointer-events-none' : ''}`}>
        <div className="flex justify-center items-center h-screen">
          <div className="w-1/2 bg-white p-4 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Problem Page</h1>
            <div
              onClick={handleAddingPanel}
              className="cursor-pointer text-blue-500 underline mb-4"
            >
              Add Question
            </div>
            <p className="text-gray-700 mb-4">
              This is the problem page where you can view and solve problems.
            </p>
            <div>
              <ul>
                {problems.map((problem, index) => {
                  const [isExpanded, setIsExpanded] = useState(false);

                  const toggleExpand = () => {
                    setIsExpanded(!isExpanded);
                  };

                  return (
                    <li
                      key={index}
                      className="mb-2 p-2 border rounded-md bg-gray-50 cursor-pointer"
                      onClick={toggleExpand}
                    >
                      <h3 className="text-lg font-semibold">{problem.title}</h3>
                      <p className="text-gray-600">Topic: {problem.topic}</p>
                      {isExpanded && (
                        <div>
                          <p className="text-gray-600">Subject: {problem.subject}</p>
                          <p className="text-gray-600">Difficulty: {problem.difficulty}</p>
                          <p className="text-gray-600">Approach: {problem.approach}</p>
                          <a
                            href={problem.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                          >
                            View Problem
                          </a>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div>
        {showAddQuestionPanel && (
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white w-1/3 p-6 rounded-lg shadow-lg z-50">
              <h2 className="text-xl font-semibold mb-4">Add New Question</h2>
              <h4>Title: </h4>
              <input
                type="text"
                name="title"
                value={problem.title}
                onChange={handleInputChange}
                placeholder="Enter question title..."
                className="border p-2 w-full mb-4"
              />
              <h4>Topic: </h4>
              <input
                type="text"
                name="topic"
                value={problem.topic}
                onChange={handleInputChange}
                placeholder="Enter topic..."
                className="border p-2 w-full mb-4"
              />
              <h4>Subject: </h4>
              <input
                type="text"
                name="subject"
                value={problem.subject}
                onChange={handleInputChange}
                placeholder="Enter subject..."
                className="border p-2 w-full mb-4"
              />
              <h4>Difficulty: </h4>
              <select
                name="difficulty"
                value={problem.difficulty}
                onChange={handleInputChange}
                className="border p-2 w-full mb-4"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              <h4>URL: </h4>
              <input
                type="text"
                name="url"
                value={problem.url}
                onChange={handleInputChange}
                placeholder="Enter URL..."
                className="border p-2 w-full mb-4"
              />
              <h4>Approach: </h4>
              <textarea
                name="approach"
                value={problem.approach}
                onChange={handleInputChange}
                placeholder="Enter problem approach..."
                className="border p-2 w-full mb-4"
              />
              <div className="flex justify-end">
                <button
                  onClick={closePanel}
                  className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                >
                  Close
                </button>
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </div>
            <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProblemPage;