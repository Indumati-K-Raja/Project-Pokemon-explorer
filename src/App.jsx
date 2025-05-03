import React from 'react';
import { PokemonProvider } from './context/PokemonProvider';
import ListView from './components/ListView';
import CompareNowButton from './features/compare/CompareNowButton';
import '.CompareModal';
import './App.css'; // Ensure you have this CSS file for styling
const App = () => {
  return (
    <PokemonProvider>
      <div className="app-container">
        <ListView />
        <CompareNowButton /> {/* ✅ Add this here to render the Compare button */}
      </div>
    </PokemonProvider>
  );
};

export default App;
