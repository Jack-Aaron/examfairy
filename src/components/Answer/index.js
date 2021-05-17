import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import './style.css';

const Answer = ({ value, index, toggleStrikethrough }) => {

  return (
    <ListGroup.Item id={`answer${index}`} className='answer'
      onClick={() => toggleStrikethrough(`answer${index}`)}>
      <li>{value}</li>
    </ListGroup.Item>
  )
}

export default Answer