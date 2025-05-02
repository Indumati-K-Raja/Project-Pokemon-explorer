import { useContext, useEffect, useState } from 'react';
import { PokemonContext } from '../../context/PokemonContext';
import { Link } from 'react-router-dom';

const ListView = () => {
  const {
    pokemonList,
    filteredList,
    setFilteredList,
    favorites,
    toggleFavorite,
    loading,
    error,
  } = useContext(PokemonContext);

  const [types, setTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortOrder, setSortOrder] = useState('id'); // id, name-asc, name-desc
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch all types
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/type');
        const data = await res.json();
        const cleanedTypes = data.results
          .map((t) => t.name)
          .filter((t) => t !== 'unknown' && t !== 'shadow');
        setTypes(cleanedTypes);
      } catch (err) {
        console.error('Failed to fetch types', err);
      }
    };

    fetchTypes();
  }, []);

  // Filtering & Sorting
  useEffect(() => {
    let list = [...pokemonList];

    if (selectedTypes.length > 0) {
      list = list.filter((p) =>
        selectedTypes.every((type) =>
          p.types.map((t) => t.type.name).includes(type)
        )
      );
    }

    if (sortOrder === 'name-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'name-desc') {
      list.sort((a, b) => b.name.localeCompare(a.name));
    } else {
      list.sort((a, b) => a.id - b.id);
    }

    setFilteredList(list);
    setCurrentPage(1);
  }, [pokemonList, selectedTypes, sortOrder, setFilteredList]);

  // Pagination
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const paginatedData = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleTypeToggle = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Pokémon Explorer</h1>

      {/* Controls */}
      <div className="mb-4 flex flex-wrap gap-4">
        {/* Sort */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="id">Sort by ID</option>
          <option value="name-asc">Name A–Z</option>
          <option value="name-desc">Name Z–A</option>
        </select>

        {/* Items per page */}
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
          className="border p-2 rounded"
        >
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={50}>50 per page</option>
        </select>

        {/* Filter by type */}
        <div className="flex flex-wrap gap-2">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => handleTypeToggle(type)}
              className={`px-2 py-1 rounded-full text-sm border ${
                selectedTypes.includes(type)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Loading / Error */}
      {loading && <p>Loading Pokémon...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Pokémon List */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {paginatedData.map((p) => (
          <div
            key={p.id}
            className="border p-3 rounded shadow hover:shadow-md transition relative"
          >
            <Link to={`/pokemon/${p.id}`}>
              <img
                src={p.sprites.front_default}
                alt={p.name}
                className="w-20 h-20 mx-auto"
              />
              <h3 className="text-center font-semibold capitalize">{p.name}</h3>
              <div className="flex justify-center gap-2 mt-1 text-xs">
                {p.types.map((t) => (
                  <span
                    key={t.type.name}
                    className="bg-gray-200 px-2 py-1 rounded-full"
                  >
                    {t.type.name}
                  </span>
                ))}
              </div>
            </Link>

            <button
              className={`absolute top-2 right-2 text-lg ${
                favorites.includes(p.id) ? 'text-red-500' : 'text-gray-400'
              }`}
              onClick={() => toggleFavorite(p.id)}
            >
              ♥
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-2 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded border ${
              currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ListView;
