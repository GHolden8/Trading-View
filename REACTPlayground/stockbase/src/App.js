import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import StockFavoritesPage from './StockFavoritesPage';
import StockExaminer from './StockExaminer';
import testStockExaminer from './TestStockExaminer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/stockexaminer" element={<StockExaminer />} />
        <Route path="/stockfavorites" element={< StockFavoritesPage/>} />
        <Route path="/teststockexaminer" element={<TestStockExaminer/>} />
      </Routes>
    </Router>
  );
}

export default App;


