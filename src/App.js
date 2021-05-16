import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Question from './components/Question';
import QUESTIONS from './questions';
import shuffle from './shuffle';
import './App.css';

const App = () => {
  // prepares questions & answers and sets state
  useEffect(() => prepareQuestions(), []);
  const [questionsState, setQuestionsState] = useState();
  const prepareQuestions = () => {
    let shuffledQuestions = shuffle(QUESTIONS); // input of a question set
    shuffledQuestions = shuffledQuestions.map((question) => {
      shuffle(question.answers); // shuffles answers within the questions
      setQuestionsState(shuffledQuestions)
    })
  };
  // test ends
  const [session, setSession] = useState(true)
  const endSession = () => setSession(false)

  return (
    <div className='App'>
      <Container className='questionCard'
        style={{ display: session ? 'block' : 'none' }}>
        {questionsState !== undefined ?
          <Question questionsState={questionsState}
            setQuestionsState={setQuestionsState}
            endSession={endSession} shuffle={shuffle}
          /> : null}
      </Container>
    </div>)
};

export default App