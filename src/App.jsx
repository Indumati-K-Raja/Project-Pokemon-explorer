import React from 'react';
import { PokemonProvider } from './context/PokemonProvider';
import ListView from './components/ListView'; // or wherever your main component is

const App = () => {
  return (
    <PokemonProvider>
      <ListView />
    </PokemonProvider>
  );
};

export default App;
