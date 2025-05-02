import React from 'react';
import { usePokemonContext } from '../../context/PokemonProvider';
import './PokemonCard.css'; // Make sure to create this file or move styles to App.css

function PokemonCard({ pokemon }) {
  const { addToCompare, removeFromCompare, compareList } = usePokemonContext();

  const isInCompareList = compareList.some(p => p.id === pokemon.id);

  const handleCompareClick = () => {
    if (isInCompareList) {
      removeFromCompare(pokemon.id);
    } else {
      addToCompare(pokemon);
    }
  };

  return (
    <div className={`pokemon-card ${isInCompareList ? 'selected' : ''}`}>
      <img
        src={pokemon.sprites?.front_default}
        alt={pokemon.name}
        className="pokemon-img"
      />
      <h3 className="pokemon-name">{pokemon.name}</h3>
      <button onClick={handleCompareClick} className="compare-btn">
        {isInCompareList ? 'Remove from Compare' : 'Add to Compare'}
      </button>
    </div>
  );
}

export default PokemonCard;
