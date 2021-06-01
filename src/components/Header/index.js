import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './style.css';

const Header = ({ wrongAnswer, questionsState }) => {
  const questionsTotal = questionsState.length;
  let count = questionsState.length;
  return (
    <div>
      <Jumbotron>
        <h1 className="display-1 up">
          <span className={wrongAnswer ? 'down' : 'up'}>{questionsTotal - count + 1}</span>
          {' | ' + questionsTotal}</h1>
        <br /><br /><br />
      </Jumbotron>
    </div>
  )
}

export default Header