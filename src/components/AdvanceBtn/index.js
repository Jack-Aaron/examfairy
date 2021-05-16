import React from 'react';
import Button from 'react-bootstrap/Button';

const AdvanceBtn = ({ cardsState, setCardScore, id, variant, text }) => {

  const handleBtnClick = () => {
    let stateCopy = Object.assign({}, cardsState);
    console.log(stateCopy);
    stateCopy[0] = stateCopy.slice(0, 1);
    stateCopy[0]['score'] = Object.assign({}, stateCopy[0]['score']);
    stateCopy[0]['score'] += 1;
    setCardScore(stateCopy);
    console.log(Object.entries(cardsState[0]))
  }

  return (
    <div>
      <Button onClick={() => handleBtnClick()} variant={variant}>{text}</Button>
    </div>
  );
};

export default AdvanceBtn;