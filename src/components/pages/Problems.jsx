import React, { useContext, useState, useMemo } from 'react';
import { ProblemContext } from '../../context/ProblemContext';
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: apiKey });

async function getApproach(problem) {
  try {
    const prompt = `
    I need a approach to solve the following problem:
    
    Title: ${problem.title}
    ${problem.subject ? `Subject: ${problem.subject}` : ''}
    ${problem.difficulty ? `Difficulty: ${problem.difficulty}` : ''}
    
    Problem Description:
    ${problem.description || "No description provided"}
    
    Please provide an short approach to solve this problem in fewer lines. 
    Note: Don't write the code for the solution, just the approach.
    `;

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const responseText = result.text || "Could not generate an approach for this problem.";
    return responseText;
  } catch (error) {
    console.error("Error generating approach:", error);
    return "An error occurred while generating the approach. Please try again later.";
  }
}

const ProblemPage = () => {
  const { problems, addProblem, updateProblem } = useContext(ProblemContext);
  
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('none');
  
  const filteredProblems = useMemo(() => {
    let filtered = problems.filter((problem) =>
      problem.title.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
      problem.topic.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
      problem.subject.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
      (problem.description && problem.description.toLowerCase().includes(localSearchQuery.toLowerCase()))
    );
    
    if (sortBy === 'difficulty-asc') {
      const difficultyOrder = { 'easy': 1, 'medium': 2, 'hard': 3 };
      filtered = [...filtered].sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
    } else if (sortBy === 'difficulty-desc') {
      const difficultyOrder = { 'easy': 1, 'medium': 2, 'hard': 3 };
      filtered = [...filtered].sort((a, b) => difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty]);
    } else if (sortBy === 'topic-asc') {
      filtered = [...filtered].sort((a, b) => a.topic.localeCompare(b.topic));
    } else if (sortBy === 'topic-desc') {
      filtered = [...filtered].sort((a, b) => b.topic.localeCompare(a.topic));
    }
    
    return filtered;
  }, [problems, localSearchQuery, sortBy]);

  const [problem, setProblem] = useState({
    title: '',
    topic: '',
    subject: '',
    difficulty: 'easy',
    url: '',
    description: '',
    approach: ''
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProblem((prevProblem) => ({
      ...prevProblem,
      [name]: value
    }));
  };

  const handleSearchChange = (e) => {
    setLocalSearchQuery(e.target.value);
  };

  const handleSave = () => {
    if (!problem.title.trim() || !problem.topic.trim() || !problem.description.trim()) {
      alert("Please fill out the Title, Topic, and Description fields before saving.");
      return;
    }

    addProblem(problem);
    setProblem({
      title: '',
      topic: '',
      subject: '',
      difficulty: 'easy',
      url: '',
      description: '',
      approach: ''
    });
  };

  const handleGetHelp = async (problemToSolve, index) => {
    try {
      setLoading(true);
      const generatedApproach = await getApproach(problemToSolve);
      
      const updatedProblem = { ...problemToSolve, approach: generatedApproach };
      updateProblem(index, updatedProblem);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching approach:', error);
      setLoading(false);
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        name="description"
                        value={problem.description}
                        onChange={handleInputChange}
                        placeholder="Describe your problem here..."
                        className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      />
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

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                value={localSearchQuery}
                onChange={handleSearchChange}
                placeholder="Search problems..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            
            <div className="relative w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="bg-white border border-gray-300 text-gray-700 py-2 pl-3 pr-10 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
              >
                <option value="none">Sort by</option>
                <option value="difficulty-asc">Difficulty (Easy → Hard)</option>
                <option value="difficulty-desc">Difficulty (Hard → Easy)</option>
                <option value="topic-asc">Topic (A → Z)</option>
                <option value="topic-desc">Topic (Z → A)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            {problems.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No problems added yet</h3>
                <p className="mt-1 text-gray-500">Get started by clicking the "Add Question" button above.</p>
              </div>
            ) : filteredProblems.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No matching problems</h3>
                <p className="mt-1 text-gray-500">Try adjusting your search query</p>
              </div>
            ) : filteredProblems.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No matching problems</h3>
                <p className="mt-1 text-gray-500">Try adjusting your search query</p>
              </div>
            ) : (
              <ul className="space-y-3">
                {filteredProblems.map((problemItem, index) => (
                  <Dialog.Root key={index}>
                    <Dialog.Trigger asChild>
                      <li className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white cursor-pointer">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{problemItem.title}</h3>
                            <p className="text-gray-600 mt-1">Topic: {problemItem.topic}</p>
                          </div>
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${getDifficultyColor(problemItem.difficulty)}`}>
                            {problemItem.difficulty}
                          </span>
                        </div>
                      </li>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                      <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
                      <Dialog.Content className="fixed bg-white p-8 rounded-xl shadow-xl z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <Dialog.Title className="text-2xl font-bold text-gray-800">{problemItem.title}</Dialog.Title>
                            <span className={`mt-2 inline-block text-xs font-medium px-2.5 py-1 rounded-full capitalize ${getDifficultyColor(problemItem.difficulty)}`}>
                              {problemItem.difficulty}
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
                              <p className="text-gray-800 font-medium">{problemItem.topic}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Subject</h4>
                              <p className="text-gray-800 font-medium">{problemItem.subject}</p>
                            </div>
                          </div>
                        </div>
                        
                        {problemItem.description && (
                          <div className="mb-6">
                            <h4 className="text-sm font-medium text-gray-500 mb-2">Description</h4>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <p className="text-gray-800 whitespace-pre-line">{problemItem.description}</p>
                            </div>
                          </div>
                        )}
                        
                        <div className="mb-6">
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Approach</h4>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            {loading ? (
                              <div className="flex items-center justify-center py-4">
                                <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span className="ml-2">Generating approach...</span>
                              </div>
                            ) : (
                              <p className="text-gray-800 whitespace-pre-line">{problemItem.approach || "No approach added yet. Click 'Get Help' to get Ai's Help."}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <a
                            href={problemItem.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Visit Problem URL
                          </a>
                          <button
                            onClick={() => handleGetHelp(problemItem, index)}
                            disabled={loading}
                            className={`px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            {loading ? 'Generating...' : 'Get Help'}
                          </button>
                        </div>
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