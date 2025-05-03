import React, { useState } from 'react';
import { usePokemonContext } from '../../context/PokemonContext';
import CompareModal from './CompareModal';
import './CompareNowButton.css';

const CompareNowButton = () => {
  const { compareList } = usePokemonContext();
  const [showModal, setShowModal] = useState(false);

  if (compareList.length < 2) return null;

  return (
    <>
      <button className="compare-now-btn" onClick={() => setShowModal(true)}>
        Compare Now ({compareList.length})
      </button>
      {showModal && <CompareModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default CompareNowButton;
