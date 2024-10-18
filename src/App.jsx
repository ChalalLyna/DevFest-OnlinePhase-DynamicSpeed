import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login.jsx'
import './index.css'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
