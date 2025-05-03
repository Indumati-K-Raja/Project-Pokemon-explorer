import { useEffect, useState } from 'react';
import { usePokemonContext } from '../../context/PokemonContext';
import PokemonCard from '../../components/PokemonCard';
import '../../features/styles/PokemonCard.css';

const ListView = () => {
  const {
    pokemonList,
    filteredList,
    setFilteredList,
    loading,
    error,
  } = usePokemonContext();

  const [types, setTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortOrder, setSortOrder] = useState('id');
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch types
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
    if (!pokemonList || pokemonList.length === 0) return;

    let list = [...pokemonList];

    if (selectedTypes.length > 0) {
      list = list.filter((p) =>
        selectedTypes.some((type) =>
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

  // Auto-deselect types
  const handleTypeToggle = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? [] : [type] // Deselect if clicked again, else select only that
    );
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Pokémon Explorer</h1>

      {/* Controls */}
      <div className="mb-6 flex flex-wrap gap-4 items-center justify-center">

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-blue-500 text-blue-600 bg-blue-50 p-2 rounded-lg shadow-sm"
        >
          <option value="id">Sort by ID</option>
          <option value="name-asc">Name A–Z</option>
          <option value="name-desc">Name Z–A</option>
        </select>

        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
          className="border border-green-500 text-green-700 bg-green-50 p-2 rounded-lg shadow-sm"
        >
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={50}>50 per page</option>
        </select>

        <div className="flex flex-wrap gap-2 justify-center">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => handleTypeToggle(type)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                selectedTypes.includes(type)
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Loading / Error */}
      {loading && <p className="text-center text-lg">Loading Pokémon...</p>}
      {error && <p className="text-red-500 text-center">Error: {error}</p>}

      {/* Pokémon Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedData.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center gap-2 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded-lg font-medium border transition ${
              currentPage === i + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
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
