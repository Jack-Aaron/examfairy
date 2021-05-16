import React, { useEffect, useState } from 'react';
// import { Transition } from 'react-transition-group';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Question from './components/Question';
import QUESTIONS from './questions';

function App() {

  const shuffle = (array) => { //https://bit.ly/3eNujre
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }  

  const [questionsState, setQuestionsState] = useState();

  const prepareQuestions = () => {
    //   let latestProgress = JSON.parse(localStorage.getItem('latest_progress'));
    //   if (latestProgress) {
    //     let shuffledQuestions = shuffle(latestProgress);
    //     console.log(shuffledQuestions);
    //     shuffledQuestions = shuffledQuestions.map((question) => {
    //       shuffle(question.answers)
    //       setQuestionsState(shuffledQuestions)
    //     })
    //   }
    // else {

    let shuffledQuestions = shuffle(QUESTIONS);
    console.group();
    shuffledQuestions = shuffledQuestions.map((question) => {
      shuffle(question.answers)
      setQuestionsState(shuffledQuestions)
      console.log('Question: ' + question.question)
      console.log('Score: ' + question.score)
    })
    console.groupEnd()


    // };
  }

  useEffect(() => prepareQuestions(), []);

  const [session, setSession] = useState(true);

  const endSession = () => {
    setSession(false)
  }

  return (
    <div className='App' style={{ backgroundColor: 'lightpink' }}>
      <Container fluid style={{ display: session ? 'inherit' : 'none', paddingTop: '30vh' }}>
        {
          questionsState !== undefined ?
            <Question style={{ minWidth: '600px' }} questionsState={questionsState} setQuestionsState={setQuestionsState} endSession={endSession} shuffle={shuffle}
            />
            :
            <div>All done!</div>
        }


      </Container>
    </div>
  );
}

export default App;
