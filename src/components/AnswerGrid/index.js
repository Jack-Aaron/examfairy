import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Answer from '../Answer';
import './style.css';

const AnswerGrid = ({ questionsState, toggleStrikethrough, strikethrough }) => {
  return (
    <ListGroup as='ol'><ol type='A'>
      {questionsState[0].answers.map((answer, index) => (
        <Answer
          key={'key' + index}
          index={index}
          value={answer}
          toggleStrikethrough={toggleStrikethrough}
        />))}
    </ol></ListGroup>)
}

export default AnswerGrid