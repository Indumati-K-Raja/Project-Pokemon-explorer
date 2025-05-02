import React from 'react';
import { usePokemonContext } from '../../context/PokemonContext';
//import '../../styles/ComparePage.css'; // Optional: for styling if needed

const ComparePage = () => {
  const { compareList, toggleCompare } = usePokemonContext();

  if (compareList.length === 0) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>No Pokémon selected for comparison.</p>;
  }

  return (
    <div className="compare-container" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
      {compareList.map((pokemon) => (
        <div
          key={pokemon.id}
          className="compare-card"
          style={{
            border: '1px solid #ccc',
            borderRadius: '12px',
            padding: '1rem',
            width: '250px',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }}
        >
          <img
            src={pokemon.image || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
            alt={pokemon.name}
            style={{ width: '100px', height: '100px' }}
          />
          <h3 style={{ textTransform: 'capitalize' }}>{pokemon.name}</h3>
          <p><strong>ID:</strong> {pokemon.id}</p>
          <p><strong>Height:</strong> {pokemon.height}</p>
          <p><strong>Weight:</strong> {pokemon.weight}</p>
          <p>
            <strong>Types:</strong>{' '}
            {pokemon.types?.map((t) => t.type?.name || t).join(', ')}
          </p>

          <button
            onClick={() => toggleCompare(pokemon)}
            style={{
              marginTop: '1rem',
              background: '#ff3e3e',
              border: 'none',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Remove from Compare
          </button>
        </div>
      ))}
    </div>
  );
};

export default ComparePage;
