import React from 'react';
import { Link } from 'react-router-dom';
import { usePokemonContext } from '../contexts/PokemonContext';
import FavoriteButton from './FavoriteButton';
import '../styles/PokemonCard.css';

const PokemonCard = ({ pokemon }) => {
  const { favorites, toggleFavorite, compareList, toggleCompare } = usePokemonContext();

  const isFavorite = favorites.includes(pokemon.id);
  const isInCompare = compareList.some(p => p.id === pokemon.id);

  return (
    <div className="pokemon-card">
      <Link to={`/pokemon/${pokemon.id}`} className="pokemon-link">
        <img src={pokemon.image} alt={pokemon.name} />
        <h3>{pokemon.name}</h3>
        <p>Type: {pokemon.types.join(', ')}</p>
      </Link>

      <div className="pokemon-card-actions">
        <FavoriteButton
          isFavorite={isFavorite}
          onClick={() => toggleFavorite(pokemon.id)}
        />

        <button
          className={`compare-btn ${isInCompare ? 'active' : ''}`}
          onClick={() => toggleCompare(pokemon)}
        >
          {isInCompare ? 'Remove' : 'Compare'}
        </button>
      </div>
    </div>
  );
};

export default PokemonCard;
