import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './style.css';

const Header = ({ questionsState }) => {
  let totalQuestions = questionsState;

  return (
    <div>
      <Jumbotron>
        <h1 className="display-1">{totalQuestions.length + '/' + 4}</h1>
        <br /><br /><br />
      </Jumbotron>
    </div>
  )
}

export default Header