import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './style.css';

const Header = ({ wrongAnswer, questionsState }) => {
  let count = questionsState.length;
  const questionsTotal = count;
  return (
    <div>
      <Jumbotron>
        <h1 className="display-1 up">
          <span className={wrongAnswer ? 'down' : 'up'}>{20 - count + 1}</span>
          {' | ' + 20}</h1>
        <br /><br /><br />
      </Jumbotron>
    </div>
  )
}

export default Header