import { useContext } from 'react';
import { PokemonContext } from './PokemonProvider';

export const usePokemonContext = () => useContext(PokemonContext);
