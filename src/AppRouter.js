import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonListPage from './features/pokemonList/PokemonListPage';
import PokemonDetailPage from './features/detail/PokemonDetailPage';
import FavoritesPage from './features/favorites/FavoritesPage';
import ComparePage from './features/compare/ComparePage';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PokemonListPage />} />
        <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/compare" element={<ComparePage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
