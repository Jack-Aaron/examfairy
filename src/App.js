import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Question from './components/Question';
import QUESTIONS from './questions';
import shuffle from './shuffle';
import './App.css';

const App = () => {
  // prep local storage
  const initLclStrg = JSON.stringify(localStorage); // the formation of session storage
  const strgStr = 'examFairy_progress';
  let storageState = localStorage[`${strgStr}`];
  let progressClone = initLclStrg[`${strgStr}`]; // mutable form of session inital storage

  const fetchLocalStorage = () => {
    let storageClone = storageState;
    console.log('L O C A L S T O R A G E: ' + storageClone);
    return storageClone
  };
  const mutateprogressClone = (data) => { // can be own object structure bc of parameter
    progressClone = data;
    console.log('P R O G R E S S C L O N E : ' + progressClone);
    return progressClone
  };
  const writeLocalStorage = (data) => { localStorage[`${strgStr}`] = JSON.stringify(data) };
  // prepare questions & answers and set states
  const [questionsState, setQuestionsState] = useState();
  const [progressForLocalStorage, setProgressForLocalStorage] = useState(QUESTIONS);
  useEffect(() => {
    // initialize local storage of testing progress
    if (progressClone === undefined) mutateprogressClone(progressForLocalStorage)
    else setProgressForLocalStorage(JSON.parse(progressClone));

    let shuffledQuestions = shuffle(QUESTIONS); // paramater is input of a question set
    shuffledQuestions = shuffledQuestions.map(question => {
      shuffle(question.answers); // shuffles answers within the questions
      return setQuestionsState(shuffledQuestions) // **add stuff later here for persistant sessions**
    })
  }, []);
  // test ends
  const [session, setSession] = useState(true)
  const endSession = () => {
    localStorage['examFairy_progress'] = progressForLocalStorage;
    setSession(false)
  }

  return (
    <div className='App'>
      <Container>
        {questionsState !== undefined && session ?
          <Question progressForLocalStorage={progressForLocalStorage}
            setProgressForLocalStorage={setProgressForLocalStorage}
            fetchLocalStorage={fetchLocalStorage} mutateprogressClone={mutateprogressClone} writeLocalStorage={writeLocalStorage}
            questionsState={questionsState} setQuestionsState={setQuestionsState}
            endSession={endSession} shuffle={shuffle}
          /> : !session ? <h1>FINISHED!</h1> : null}
      </Container>
    </div>)
};

export default App