import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Question from './components/Question';
import Header from './components/Header';
import Quote from './components/Quote';
import QUESTIONS from './review_questions.json';
import shuffle from './shuffle';
import './App.css';

const App = () => {
  // prepare questions & answers and set states
  const [quote, setQuote] = useState()
  const [questionsState, setQuestionsState] = useState()
  const [wrongAnswer, setWrongAnswer] = useState(false); // determines logic flow later

  useEffect(() => {
    fetch("https://type.fit/api/quotes") // https://bit.ly/3okopkK
      .then(res => {
        return res.json();
      }).then(data => {
        let quote = data[`${Math.floor(Math.random() * 1643)}`];
        return quote
      }).then(quote => {
        setQuote(quote)
      });

    let shuffledQuestions = shuffle(QUESTIONS); // paramater is input of a question set
    shuffledQuestions = shuffledQuestions.map(question => {
      shuffle(question.answers); // shuffles answers within the questions
      return setQuestionsState(shuffledQuestions) // **persistant sessions**
    });
  }, []);

  // test ends
  const [storageClone, setStorageClone] = useState([])
  const [session, setSession] = useState(true)

  const endSession = () => {
    localStorage.setItem('examFairy_progress', JSON.stringify(storageClone));
    setSession(false)
  };

  return (
    <Router>
      <div className='App'>
        {questionsState !== undefined && session ?
          <Header questionsState={questionsState} 
          wrongAnswer={wrongAnswer}
          setWrongAnswer={setWrongAnswer} /> : null}
        <Container>
          {questionsState !== undefined && session ?
            <Question questionsState={questionsState}
              setQuestionsState={setQuestionsState}
              wrongAnswer={wrongAnswer}
              setWrongAnswer={setWrongAnswer}
              storageClone={storageClone} setStorageClone={setStorageClone}
              endSession={endSession} shuffle={shuffle}
            />
            : !session ? <Quote quote={quote} /> : null}
        </Container>
      </div>
    </Router>)
};

export default App