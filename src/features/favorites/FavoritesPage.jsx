// features/favorites/FavoritesPage.jsx
import React from 'react';
import { usePokemonContext } from '../../context/PokemonContext';

const FavoritesPage = () => {
  const { favorites, removeFromFavorites } = usePokemonContext();

  if (favorites.length === 0) {
    return <div style={{ padding: '2rem' }}>No favorites added yet.</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Favorite Pokémon</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {favorites.map((pokemon) => (
          <div
            key={pokemon.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '1rem',
              width: '150px',
              textAlign: 'center'
            }}
          >
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <h4 style={{ textTransform: 'capitalize' }}>{pokemon.name}</h4>
            <button onClick={() => removeFromFavorites(pokemon.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
