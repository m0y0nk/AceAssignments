import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProblemProvider from './context/ProblemContext';
import Navbar from './components/navbar/Navbar';
import LandingPage from './components/pages/Landing';
import ProblemPage from './components/pages/Problems';
import TrackerPage from './components/pages/Tracker';
import GoalSetPage from './components/pages/GoalSet';
import AddQuestionPage from './helper/AddQuestionPage';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="container mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/problems"
                element={
                  <ProblemProvider>
                    <ProblemPage />
                  </ProblemProvider>
                }
              />
              <Route
                path="/tracker"
                element={
                  <ProblemProvider>
                    <TrackerPage />
                  </ProblemProvider>
                }
              />
              <Route path="/add-event" element={<GoalSetPage />} />
              <Route
                path="/add-question"
                element={
                  <ProblemProvider>
                    <AddQuestionPage />
                  </ProblemProvider>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;