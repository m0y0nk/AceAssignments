import React, { useContext, useState } from 'react';
import { ProblemContext } from '../../context/ProblemContext';
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

const ProblemPage = () => {
  const { problems, addProblem } = useContext(ProblemContext);

  const [problem, setProblem] = useState({
    title: '',
    topic: '',
    subject: '',
    difficulty: 'easy',
    url: '',
    approach: ''
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
      url: '',
      approach: ''
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className='flex flex-row justify-between items-center mb-6'>
            <h1 className="text-3xl font-bold text-gray-800">Problem Tracker</h1>

            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Question
                </button>
              </Dialog.Trigger>

              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
                <Dialog.Content className="fixed bg-white p-8 rounded-xl shadow-xl z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-6">
                    <Dialog.Title className="text-2xl font-bold text-gray-800">Add New Question</Dialog.Title>
                    <Dialog.Close asChild>
                      <button aria-label="Close" className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100 transition-colors">
                        <Cross2Icon className="w-5 h-5" />
                      </button>
                    </Dialog.Close>
                  </div>
                  
                  <div className="space-y-5">
                    {['title', 'topic', 'subject', 'url'].map((field) => (
                      <div key={field}>
                        <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{field}</label>
                        <input
                          type="text"
                          name={field}
                          value={problem[field]}
                          onChange={handleInputChange}
                          className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          placeholder={`Enter ${field}`}
                        />
                      </div>
                    ))}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                      <select
                        name="difficulty"
                        value={problem.difficulty}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Approach</label>
                      <textarea
                        name="approach"
                        value={problem.approach}
                        onChange={handleInputChange}
                        placeholder="Describe your problem-solving approach here..."
                        className="border border-gray-300 rounded-lg p-3 w-full h-40 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end space-x-3">
                    <Dialog.Close asChild>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                        Cancel
                      </button>
                    </Dialog.Close>
                    <Dialog.Close asChild>
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Save Question
                      </button>
                    </Dialog.Close>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>

          <p className="text-gray-600 mb-8">
            Track and organize your coding problems, solutions, and approaches all in one place.
          </p>

          {/* Problems List */}
          <div>
            {problems.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No problems added yet</h3>
                <p className="mt-1 text-gray-500">Get started by clicking the "Add Question" button above.</p>
              </div>
            ) : (
              <ul className="space-y-3">
                {problems.map((problem, index) => (
                  <Dialog.Root key={index}>
                    <Dialog.Trigger asChild>
                      <li className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white cursor-pointer">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{problem.title}</h3>
                            <p className="text-gray-600 mt-1">Topic: {problem.topic}</p>
                          </div>
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${getDifficultyColor(problem.difficulty)}`}>
                            {problem.difficulty}
                          </span>
                        </div>
                      </li>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                      <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
                      <Dialog.Content className="fixed bg-white p-8 rounded-xl shadow-xl z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <Dialog.Title className="text-2xl font-bold text-gray-800">{problem.title}</Dialog.Title>
                            <span className={`mt-2 inline-block text-xs font-medium px-2.5 py-1 rounded-full capitalize ${getDifficultyColor(problem.difficulty)}`}>
                              {problem.difficulty}
                            </span>
                          </div>
                          <Dialog.Close asChild>
                            <button aria-label="Close" className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100 transition-colors">
                              <Cross2Icon className="w-5 h-5" />
                            </button>
                          </Dialog.Close>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Topic</h4>
                              <p className="text-gray-800 font-medium">{problem.topic}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Subject</h4>
                              <p className="text-gray-800 font-medium">{problem.subject}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Approach</h4>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-800 whitespace-pre-line">{problem.approach}</p>
                          </div>
                        </div>
                        
                        <a
                          href={problem.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Visit Problem URL
                        </a>
                      </Dialog.Content>
                    </Dialog.Portal>
                  </Dialog.Root>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProblemPage;