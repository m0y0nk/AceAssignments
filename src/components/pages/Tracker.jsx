import React from 'react';
import { ProblemContext } from '../../context/ProblemContext';
import { useContext, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';

export default function ProblemPage() {
  const { problems } = useContext(ProblemContext);
  
  const topicData = useMemo(() => {
    const topicCounts = {};
    
    problems.forEach(problem => {
      if (!topicCounts[problem.topic]) {
        topicCounts[problem.topic] = 0;
      }
      topicCounts[problem.topic]++;
    });
    
    return Object.keys(topicCounts).map(topic => ({
      topic,
      count: topicCounts[topic]
    }));
  }, [problems]);
  
  const difficultyData = useMemo(() => {
    const difficultyCounts = {
      easy: 0,
      medium: 0,
      hard: 0
    };
    
    problems.forEach(problem => {
      const difficulty = problem.difficulty.toLowerCase();
      if (difficultyCounts.hasOwnProperty(difficulty)) {
        difficultyCounts[difficulty]++;
      }
    });
    
    const total = problems.length;
    
    return [
      { name: 'Easy', value: difficultyCounts.easy, percentage: (difficultyCounts.easy / total) * 100 },
      { name: 'Medium', value: difficultyCounts.medium, percentage: (difficultyCounts.medium / total) * 100 },
      { name: 'Hard', value: difficultyCounts.hard, percentage: (difficultyCounts.hard / total) * 100 }
    ];
  }, [problems]);
  
  const approachData = useMemo(() => {
    const withApproach = problems.filter(problem => problem.approach && problem.approach.trim() !== '').length;
    const withoutApproach = problems.length - withApproach;
    const total = problems.length;
    
    return [
      { name: 'With Approach', value: withApproach, percentage: (withApproach / total) * 100 },
      { name: 'Without Approach', value: withoutApproach, percentage: (withoutApproach / total) * 100 }
    ];
  }, [problems]);
  
  const approachByTopicData = useMemo(() => {
    const topicApproachData = {};
    
    problems.forEach(problem => {
      if (!topicApproachData[problem.topic]) {
        topicApproachData[problem.topic] = { withApproach: 0, withoutApproach: 0, total: 0 };
      }
      
      const hasApproach = problem.approach && problem.approach.trim() !== '';
      topicApproachData[problem.topic].withApproach += hasApproach ? 1 : 0;
      topicApproachData[problem.topic].withoutApproach += hasApproach ? 0 : 1;
      topicApproachData[problem.topic].total += 1;
    });
    
    return Object.keys(topicApproachData).map(topic => ({
      topic,
      withApproach: topicApproachData[topic].withApproach,
      withoutApproach: topicApproachData[topic].withoutApproach,
      total: topicApproachData[topic].total,
      completionRate: (topicApproachData[topic].withApproach / topicApproachData[topic].total) * 100
    }));
  }, [problems]);
  
  const DIFFICULTY_COLORS = {
    Easy: '#4ade80',  
    Medium: '#facc15',
    Hard: '#ef4444'   
  };
  
  const APPROACH_COLORS = {
    'With Approach': '#3b82f6', 
    'Without Approach': '#d1d5db'  
  };
  
  const getRandomColor = () => {
    const colors = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      if (payload.length > 1 && payload[0].name === "withApproach" && payload[1].name === "withoutApproach") {
        return (
          <div className="bg-white p-2 border border-gray-200 shadow-md rounded">
            <p className="font-semibold">{label}</p>
            <p className="text-blue-600">{`With Approach: ${payload[0].value} (${(payload[0].value / (payload[0].value + payload[1].value) * 100).toFixed(1)}%)`}</p>
            <p className="text-gray-600">{`Without Approach: ${payload[1].value} (${(payload[1].value / (payload[0].value + payload[1].value) * 100).toFixed(1)}%)`}</p>
            <p className="font-semibold">{`Total: ${payload[0].value + payload[1].value}`}</p>
          </div>
        );
      }
      
      if (payload[0].name === "percentage") {
        return (
          <div className="bg-white p-2 border border-gray-200 shadow-md rounded">
            <p className="font-semibold">{payload[0].payload.name}</p>
            <p>{`${payload[0].value.toFixed(1)}% (${payload[0].payload.value} problems)`}</p>
          </div>
        );
      }
      
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-md rounded">
          <p className="font-semibold">{payload[0].payload.topic}</p>
          <p>{`${payload[0].value} problems`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Problem Tracker</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-center">Problems by Topic</h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topicData} margin={{ top: 5, right: 30, left: 20, bottom: 50 }}>
                  <XAxis dataKey="topic" angle={-45} textAnchor="end" height={60} />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" name="Problems">
                    {topicData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getRandomColor()} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-center">Problems by Difficulty</h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={difficultyData}
                    dataKey="percentage"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label={({ name, percentage }) => `${name}: ${percentage.toFixed(1)}%`}
                  >
                    {difficultyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={DIFFICULTY_COLORS[entry.name]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-center">Problems With/Without Approach</h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={approachData}
                    dataKey="percentage"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label={({ name, percentage }) => `${name}: ${percentage.toFixed(1)}%`}
                  >
                    {approachData.map((entry) => (
                      <Cell key={`cell-${entry.name}`} fill={APPROACH_COLORS[entry.name]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-center">Approach Status by Topic</h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={approachByTopicData} 
                  margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
                >
                  <XAxis dataKey="topic" angle={-45} textAnchor="end" height={60} />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="withApproach" stackId="a" name="With Approach" fill={APPROACH_COLORS['With Approach']} />
                  <Bar dataKey="withoutApproach" stackId="a" name="Without Approach" fill={APPROACH_COLORS['Without Approach']} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
            <p className="text-3xl font-bold text-green-800 text-center">{difficultyData[0].value}</p>
            <p className="text-xl text-green-800 text-center">Easy Problems</p>
            <p className="text-center text-green-600 mt-2">{difficultyData[0].percentage.toFixed(1)}% of total</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
            <p className="text-3xl font-bold text-yellow-800 text-center">{difficultyData[1].value}</p>
            <p className="text-xl text-yellow-800 text-center">Medium Problems</p>
            <p className="text-center text-yellow-600 mt-2">{difficultyData[1].percentage.toFixed(1)}% of total</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
            <p className="text-3xl font-bold text-red-800 text-center">{difficultyData[2].value}</p>
            <p className="text-xl text-red-800 text-center">Hard Problems</p>
            <p className="text-center text-red-600 mt-2">{difficultyData[2].percentage.toFixed(1)}% of total</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <p className="text-3xl font-bold text-blue-800 text-center">{approachData[0].value}</p>
            <p className="text-xl text-blue-800 text-center">Problems With Approach</p>
            <p className="text-center text-blue-600 mt-2">{approachData[0].percentage.toFixed(1)}% of total</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-gray-400">
            <p className="text-3xl font-bold text-gray-800 text-center">{approachData[1].value}</p>
            <p className="text-xl text-gray-800 text-center">Problems Without Approach</p>
            <p className="text-center text-gray-600 mt-2">{approachData[1].percentage.toFixed(1)}% of total</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md text-center mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Total Problems</h3>
              <p className="text-4xl font-bold text-blue-600">{problems.length}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Topics Covered</h3>
              <p className="text-4xl font-bold text-purple-600">{topicData.length}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Approach Completion</h3>
              <p className="text-4xl font-bold text-green-600">{approachData[0].percentage.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}