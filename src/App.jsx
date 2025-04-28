import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
      .then(res => res.json())
      .then(async data => {
        const pokemonDetails = await Promise.all(
          data.results.map(p => fetch(p.url).then(r => r.json()))
        );
        setPokemons(pokemonDetails);
        setLoading(false);
      })
      .catch(err => {
        console.log('Error fetching data', err);
        setLoading(false);
      });
  }, []);

  const filteredPokemons = pokemons.filter(pokemon => {
    const matchName = pokemon.name.includes(search.toLowerCase());
    const matchType = type ? pokemon.types.some(t => t.type.name === type) : true;
    return matchName && matchType;
  });

  return (
    <div className="App">
      <h1>Pokémon Explorer</h1>

      <input
        type="text"
        placeholder="Search by name"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />

      <select onChange={(e) => setType(e.target.value)} value={type}>
        <option value="">All Types</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="grass">Grass</option>
        <option value="electric">Electric</option>
        <option value="bug">Bug</option>
        <option value="normal">Normal</option>
        <option value="poison">Poison</option>
        <option value="fairy">Fairy</option>
        <option value="ground">Ground</option>
        <option value="fighting">Fighting</option>
      </select>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="pokemon-list">
          {filteredPokemons.length === 0 ? (
            <p>No Pokémon found.</p>
          ) : (
            filteredPokemons.map(pokemon => (
              <div key={pokemon.id} className="pokemon-card">
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                <h3>{pokemon.name}</h3>
                <p>ID: {pokemon.id}</p>
                <div className="types">
                  {pokemon.types.map(t => (
                    <span key={t.type.name}>{t.type.name}</span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default App;
