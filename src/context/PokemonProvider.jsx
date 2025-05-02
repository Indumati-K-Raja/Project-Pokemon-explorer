// src/context/PokemonProvider.jsx

import React, { createContext, useContext, useEffect, useState } from 'react';

const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [compareList, setCompareList] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const data = await res.json();

        const detailedList = await Promise.all(
          data.results.map((p) => fetch(p.url).then((r) => r.json()))
        );

        setPokemonList(detailedList);
        setFilteredList(detailedList);
      } catch (err) {
        console.error('Error fetching Pokémon', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addToCompare = (pokemon) => {
    setCompareList((prevList) =>
      prevList.some((p) => p.id === pokemon.id) ? prevList : [...prevList, pokemon]
    );
  };

  const removeFromCompare = (pokemonId) => {
    setCompareList((prevList) => prevList.filter((p) => p.id !== pokemonId));
  };

  const addToFavorites = (pokemon) => {
    setFavorites((prev) =>
      prev.some((fav) => fav.id === pokemon.id) ? prev : [...prev, pokemon]
    );
  };

  const removeFromFavorites = (pokemonId) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== pokemonId));
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.some((p) => p.id === id)
        ? prev.filter((p) => p.id !== id)
        : [...prev, pokemonList.find((p) => p.id === id)]
    );
  };

  return (
    <PokemonContext.Provider
      value={{
        pokemonList,
        filteredList,
        setFilteredList,
        loading,
        error,
        compareList,
        favorites,
        addToCompare,
        removeFromCompare,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
export {PokemonContext};
export const usePokemonContext = () => useContext(PokemonContext);
