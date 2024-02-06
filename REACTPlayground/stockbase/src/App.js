import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Portfolio from './Portfolio';
import StockExaminer from './StockExaminer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/stockexaminer" element={<StockExaminer />} />
      </Routes>
    </Router>
  );
}

export default App;


