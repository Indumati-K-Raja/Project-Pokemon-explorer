import React from 'react';
import { usePokemonContext } from '../context/PokemonProvider';

const PokemonCard = ({ pokemon }) => {
  const {
    addToCompare,
    removeFromCompare,
    compareList,
    toggleFavorite,
    favorites,
  } = usePokemonContext();

  const isFavorite = favorites.includes(pokemon.id); // should be an array of IDs
  const isCompared = compareList.some(p => p.id === pokemon.id);

  return (
    <div className={`rounded card-box shadow hover:shadow-md border p-3 ${isCompared ? 'bg-gray-200' : ''}`}>
      <div className="flex justify-center items-center mb-3">
        <img
          src={pokemon.sprites?.front_default || pokemon.image}
          alt={pokemon.name}
          className="rounded object-contain"
          width="80"
          height="80"
        />
      </div>

      <h3 className="capitalize font-semibold text-lg text-center">{pokemon.name}</h3>
      <p className="text-sm text-center mt-1">
        Type: {pokemon.types.map(t => t.type.name).join(', ')}
      </p>

      <div className="mt-4 flex justify-center gap-2 flex-wrap">
        <button
          className={`px-3 py-1 rounded ${isFavorite ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
          onClick={() => toggleFavorite(pokemon.id)}
        >
          {isFavorite ? '❤️ Unfavorite' : '🤍 Favorite'}
        </button>
        

        <button
          className="bg-gray-100 border px-3 py-1 rounded"
          onClick={() =>
            isCompared
              ? removeFromCompare(pokemon.id)
              : addToCompare(pokemon)
          }
        >
          {isCompared ? 'Remove' : 'Compare'}
        </button>
      </div>
    </div>
  );
};

export default PokemonCard;
