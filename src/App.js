import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListView from './features/list/ListView';
import DetailView from './features/detail/PokemonDetailPage';
import FavoritesView from './features/favorites/FavoritesView';
import CompareView from './features/compare/CompareView';
import Header from './components/Header';
import { PokemonProvider } from './contexts/PokemonContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/App.css'; // Global styles

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
        </Routes>
        <ToastContainer position="bottom-right" autoClose={1500} />
      </Router>
    </PokemonProvider>
  );
};

export default App;
