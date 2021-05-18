import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './style.css';

const Header = ({ questionsState }) => {
  let count = questionsState.length;
  return (
    <div>
      <Jumbotron>
        <h1 className="display-1">{12 - count + 1 + ' | ' + 12}</h1>
        <br /><br /><br />
      </Jumbotron>
    </div>
  )
}

export default Header