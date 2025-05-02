import React, { useContext } from 'react';
import { usePokemonContext } from '../context/PokemonContext';
import { toast } from 'react-toastify';

const CompareButton = ({ pokemon }) => {
  const { compareList, addToCompare, removeFromCompare } = useContext(usePokemonContext);
  const isInCompare = compareList.some(p => p.id === pokemon.id);

  const handleClick = () => {
    if (isInCompare) {
      removeFromCompare(pokemon.id);
      toast.info(`${pokemon.name} removed from Compare`);
    } else {
      addToCompare(pokemon);
      toast.success(`${pokemon.name} added to Compare`);
    }
  };

  return (
    <button onClick={handleClick} className="compare-btn">
      {isInCompare ? 'Remove from Compare' : 'Compare'}
    </button>
  );
};

export default CompareButton;
