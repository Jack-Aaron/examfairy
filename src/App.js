import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Question from './components/Question';
import Header from './components/Header';
import QUESTIONS from './questions';
import shuffle from './shuffle';
import './App.css';

const App = () => {
  // prepare questions & answers and set states
  const [questionsState, setQuestionsState] = useState()
  useEffect(() => {
    let shuffledQuestions = shuffle(QUESTIONS); // paramater is input of a question set
    shuffledQuestions = shuffledQuestions.map(question => {
      shuffle(question.answers); // shuffles answers within the questions
      return setQuestionsState(shuffledQuestions) // **persistant sessions**
    })
  }, []);
  // test ends
  const [storageClone, setStorageClone] = useState([])
  const [session, setSession] = useState(true)
  const endSession = () => {
    localStorage.setItem('examFairy_progress', JSON.stringify(storageClone));
    setSession(false)
  };

  return (
    <div className='App'>
      {questionsState !== undefined && session ?
        <Header questionsState={questionsState} /> : null}
      <Container>
        {questionsState !== undefined && session ?
          <Question questionsState={questionsState}
            setQuestionsState={setQuestionsState}
            storageClone={storageClone} setStorageClone={setStorageClone}
            endSession={endSession} shuffle={shuffle}
          />
          : !session ? <h1 className='App-heading display-1'>YOU DID IT!</h1> : null}
      </Container>
    </div>)
};

export default App