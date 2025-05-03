import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListView from './features/list/ListView';
import { PokemonProvider } from './context/PokemonProvider'; 
import DetailView from './features/detail/PokemonDetailPage';
import FavoritesView from './features/favorites/FavoritesPage';
import CompareView from './features/compare/ComparePage';
import Header from './components/Header';
import CompareNowButton from './features/compare/CompareNowButton';
//import './compare/CompareNowButton.css'; // Ensure you have this CSS file for styling
import './components/Header.css'; // Ensure you have this CSS file for styling
//import './features/list/ListView.css'; // Ensure you have this CSS file for styling
import './App.css';

const App = () => {
  return (
    <PokemonProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ListView />} />
          <Route path="/pokemon/:id" element={<DetailView />} />
          <Route path="/favorites" element={<FavoritesView />} />
          <Route path="/compare" element={<CompareView />} />
          <Route path="/compare" element={<CompareNowButton />} />
        </Routes>
      </Router>
    </PokemonProvider>
  );
};

export default App;
