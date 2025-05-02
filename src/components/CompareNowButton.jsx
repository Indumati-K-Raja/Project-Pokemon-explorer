import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePokemonContext } from '../context/PokemonContext';
import './CompareNowButton.css';

const CompareNowButton = () => {
  const { compareList, addToCompare, removeFromCompare } = usePokemonContext();
  const navigate = useNavigate();

  if (compareList.length < 2) return null;

  return (
    <button className="compare-now-button" onClick={() => navigate('/compare')}>
      Compare Now ({compareList.length})
    </button>
  );
};

export default CompareNowButton;
