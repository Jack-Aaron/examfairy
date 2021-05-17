import React from 'react';
import './style.css';

const Quote = ({ quote }) => {

  return (
    <>
      <br />
      <h1 className='display-1 App-heading'>YOU DID IT!</h1>
      <br /><br /><br />
      <h1 className='display-3'>{quote.text}</h1>
      <h3>&#8212; {quote.author}</h3>
    </>
  )
}

export default Quote