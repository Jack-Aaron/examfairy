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
  const [questionsState, setQuestionsState] = useState();
  useEffect(() => {
    let shuffledQuestions = shuffle(QUESTIONS); // paramater is input of a question set
    shuffledQuestions = shuffledQuestions.map(question => {
      shuffle(question.answers); // shuffles answers within the questions
      return setQuestionsState(shuffledQuestions) // **persistant sessions**
    })
  }, []);
  // test ends
  const [session, setSession] = useState(true)
  const endSession = () => {
    // localStorage['examFairy_progress'] = progressForLocalStorage;
    setSession(false)
  }

  return (
    <div className='App'>
      {questionsState !== undefined && session ?
        <Header questionsState={questionsState} /> : null}
      <Container>
        {questionsState !== undefined && session ?
          <Question questionsState={questionsState}
            setQuestionsState={setQuestionsState}
            endSession={endSession} shuffle={shuffle}
          />
          : !session ? <h1>FINISHED!</h1> : null}
      </Container>
    </div>)
};

export default App