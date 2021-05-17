import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Question from './components/Question';
import QUESTIONS from './questions';
import shuffle from './shuffle';
import './App.css';

const App = () => {
  // prep local storage
  const [progressReport, setProgressReport] = useState();
  const writeLocalStorage = (data) => localStorage.setItem('progress_report', JSON.stringify(data));
  // prepares questions & answers and sets state
  useEffect(() => prepareQuestions(), []);
  const [questionsState, setQuestionsState] = useState();
  const prepareQuestions = () => {
         // set up local storage
  if (localStorage['progressReport'] === undefined) {
    setProgressReport(QUESTIONS);
    localStorage.setItem('progressReport', JSON.stringify(QUESTIONS))
  } else {
    setProgressReport(JSON.parse(localStorage['progressReport']));
  }
    let shuffledQuestions = shuffle(QUESTIONS); // paramater is input of a question set
    shuffledQuestions = shuffledQuestions.map((question) => {
      shuffle(question.answers); // shuffles answers within the questions
      setQuestionsState(shuffledQuestions)
    })
  }
  // test ends
  const [session, setSession] = useState(true)
  const endSession = () => setSession(false)

  return (
    <div className='App'>
      <Container>
        {questionsState !== undefined && session ?
          <Question questionsState={questionsState}
            setQuestionsState={setQuestionsState}
            endSession={endSession} shuffle={shuffle}
          /> : !session ? <h1>FINISHED!</h1> : null}
      </Container>
    </div>)
};

export default App