import React from 'react';
import { usePokemonContext } from '../../context/PokemonContext';
import './CompareModal.css';

const CompareModal = ({ onClose }) => {
  const { compareList, removeFromCompare } = usePokemonContext();

  return (
    <div className="compare-modal-overlay">
      <div className="compare-modal">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>Compare Pokémon</h2>
        <div className="compare-grid">
          {compareList.map((pokemon) => (
            <div className="compare-card" key={pokemon.id}>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <h3>{pokemon.name}</h3>
              <p>Type: {pokemon.types.map(t => t.type.name).join(', ')}</p>
              <p>Height: {pokemon.height}</p>
              <p>Weight: {pokemon.weight}</p>
              <p>Base Exp: {pokemon.base_experience}</p>
              <button onClick={() => removeFromCompare(pokemon.id)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompareModal;
