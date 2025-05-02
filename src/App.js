import ListView from './features/list/ListView';
import DetailView from './features/detail/PokemonDetailPage';
//import FavoritesView from './features/favorites/FavoritesView';
//import CompareView from './features/compare/CompareView';

function App() {
  return (
    <PokemonProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ListView />} />
          <Route path="/pokemon/:id" element={<DetailView />} />
          <Route path="/favorites" element={<FavoritesView />} />
          <Route path="/compare" element={<CompareView />} />
        </Routes>
      </Router>
    </PokemonProvider>
  );
}

export default App;
