import React from 'react';
import { usePokemonContext } from '../../contexts/PokemonContext';
import PokemonStats from '../../components/PokemonStats';
import './ComparePage.css'; // optional for grid layout

const ComparePage = () => {
  const { compareList } = usePokemonContext();

  return (
    <div className="compare-page">
      <h2>Compare Pokémon</h2>
      {compareList.length < 2 ? (
        <p>Add at least 2 Pokémon to compare.</p>
      ) : (
        <div className="compare-grid">
          {compareList.map((pokemon) => (
            <div key={pokemon.id} className="compare-card">
              <h3>{pokemon.name}</h3>
              <img src={pokemon.sprites?.front_default} alt={pokemon.name} />
              <PokemonStats stats={pokemon.stats} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComparePage;
