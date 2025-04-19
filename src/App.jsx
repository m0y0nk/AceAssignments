import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProblemProvider from './context/ProblemContext'
import Navbar from './components/navbar/Navbar'
import LandingPage from './components/pages/Landing'
import ProblemPage from './components/pages/Problems'
import TrackerPage from './components/pages/Tracker'
import GoalSetPage from './components/pages/GoalSet'
import AddQuestionPage from './helper/AddQuestionPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
      <Navbar />
        <Routes>
          <Route
            exact
            path="/"
            element={<LandingPage />}
          />
          <Route
            path="/problems"
            element={
              <ProblemProvider>
                <ProblemPage />
              </ProblemProvider>
            }
          />
          <Route
            exact
            path="/tracker"
            element={<TrackerPage />}
          />
          <Route
            exact
            path="/goalsetter"
            element={<GoalSetPage />}
          />
          <Route
          exact
          path="/add-question"
          element={<AddQuestionPage />}
        />
        </Routes>
      </Router>
    </>
  )
}

export default App
