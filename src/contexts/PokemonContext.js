import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchPokemonList } from '../utils/api';

import CompareButton from './CompareButton';

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="pokemon-card">
      {/* existing content */}
      <h3>{pokemon.name}</h3>
      <CompareButton pokemon={pokemon} />
    </div>
  );
};


const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [compareList, setCompareList] = useState([]);

  // Fetch Pokémon list on initial mount
  useEffect(() => {
    const loadPokemon = async () => {
      try {
        const data = await fetchPokemonList();
        setPokemonList(data);
      } catch (error) {
        console.error('Failed to fetch Pokémon list:', error);
      }
    };

    loadPokemon();
  }, []);

  // Toggle favorite Pokémon
  const toggleFavorite = (pokemon) => {
    const isAlreadyFavorite = favorites.some((p) => p.id === pokemon.id);
    if (isAlreadyFavorite) {
      setFavorites((prev) => prev.filter((p) => p.id !== pokemon.id));
    } else {
      setFavorites((prev) => [...prev, pokemon]);
    }
  };

  // Toggle Pokémon in compare list (max 3)
  const toggleCompare = (pokemon) => {
    const isAlreadyCompared = compareList.some((p) => p.id === pokemon.id);
    if (isAlreadyCompared) {
      setCompareList((prev) => prev.filter((p) => p.id !== pokemon.id));
    } else if (compareList.length < 3) {
      setCompareList((prev) => [...prev, pokemon]);
    } else {
      alert('You can only compare up to 3 Pokémon at a time.');
    }
  };

  return (
    <PokemonContext.Provider
      value={{
        pokemonList,
        favorites,
        toggleFavorite,
        compareList,
        toggleCompare,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = () => useContext(PokemonContext);
