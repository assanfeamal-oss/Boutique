import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListeProduits from './Pages/ListeProduits';
import DetailsProduit from './Pages/DetailsProduit';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<ListeProduits />} />
        <Route path="/produit/:id" element={<DetailsProduit />} />
      </Routes>
    </Router>
  );
}

export default App;