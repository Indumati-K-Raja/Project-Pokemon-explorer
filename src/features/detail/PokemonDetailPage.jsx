import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const PokemonDetailPage = () => { 
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [evolution, setEvolution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();

        const speciesRes = await fetch(data.species.url);
        const speciesData = await speciesRes.json();

        const evoRes = await fetch(speciesData.evolution_chain.url);
        const evoData = await evoRes.json();

        const evoChain = [];
        let current = evoData.chain;

        while (current) {
          evoChain.push(current.species.name);
          current = current.evolves_to[0];
        }

        setPokemon(data);
        setEvolution(evoChain);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching Pokémon details:', err);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!pokemon) return <p className="text-center text-red-500">Pokémon not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Link to="/" className="text-blue-500 hover:underline">&larr; Back</Link>
      <div className="flex items-center gap-6 mt-4">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <div>
          <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>
          <p>ID: {pokemon.id}</p>
          <div className="mt-2">
            {pokemon.types.map((t) => (
              <span key={t.slot} className="mr-2 px-2 py-1 bg-gray-200 rounded">
                {t.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Stats</h2>
        <ul>
          {pokemon.stats.map((s) => (
            <li key={s.stat.name}>
              <strong>{s.stat.name}:</strong> {s.base_stat}
            </li>
          ))}
        </ul>
      </div>

      {/* Abilities */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Abilities</h2>
        <ul>
          {pokemon.abilities.map((a) => (
            <li key={a.ability.name}>{a.ability.name}</li>
          ))}
        </ul>
      </div>

      {/* Moves */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Moves</h2>
        <ul className="flex flex-wrap gap-2">
          {pokemon.moves.slice(0, 10).map((m) => (
            <li key={m.move.name} className="bg-gray-100 px-2 py-1 rounded">
              {m.move.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Evolution Chain */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Evolution Chain</h2>
        <div className="flex gap-3 items-center">
          {evolution.map((name, idx) => (
            <span key={idx} className="capitalize">
              {name} {idx < evolution.length - 1 && '→'}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailPage;

