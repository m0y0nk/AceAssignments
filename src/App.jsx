import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import LandingPage from './components/pages/Landing'
import ProblemPage from './components/pages/Problems'
import TrackerPage from './components/pages/Tracker'
import GoalSetPage from './components/pages/GoalSet'

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
            exact
            path="/problems"
            element={<ProblemPage />}
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
        </Routes>
      </Router>
    </>
  )
}

export default App
