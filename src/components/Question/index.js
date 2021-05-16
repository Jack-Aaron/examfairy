import React, { useEffect, useState } from 'react';
import { Transition } from 'react-transition-group';
import AdvanceBtn from '../AdvanceBtn';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import QUESTIONS from '../../questions';

const Question = ({ questionsState, setQuestionsState, endSession, shuffle }) => {

  const [hintState, setHintState] = useState(false);

  const [isHovering, setIsHovering] = useState(false);

  const toggleIsHovering = () => {  // to notice the 'Hint' ?
    setIsHovering(!isHovering)
  }

  const toggleHint = () => {
    setHintState(true)
  }

  // const questionPreOrdinals = ['A)', 'B)', 'C)', 'D)'];

  const [radioState, setRadioState] = useState();
  const handleRadio = e => {
    let radioSelection = e.target.value;
    for (let i = 0; i < 4; i++) {
      document.getElementById('answer' + i).style['background-color'] = '';
    }
    document.getElementById('answer' + radioSelection).style['background-color'] = '#EFFBFF';
    setRadioState(radioSelection);
    setBtnDisabled(false);

  }

  const [btnDisabled, setBtnDisabled] = useState(true);

  const [wrongAnswer, setWrongAnswer] = useState(false);


  const answerQuestion = e => {

    e.preventDefault();
    e.stopPropagation();
    setHintState(false);
    setBtnDisabled(true);
    let radioSelection = radioState;


    if (questionsState[0].answers[radioSelection] === questionsState[0].correctAnswer && !wrongAnswer) {
      // CORRECT ANSWER
      document.getElementById('inline-radio-' + radioSelection).checked = false;
      document.getElementById('answer' + radioSelection).style['background-color'] = '';
      //update score
      let currentState = questionsState;
      currentState[0].score += 1;
      currentState[0].correctCt += 1;
      currentState[0].viewCt += 1;
      //save all to local storage (to keep track of score over time)
      localStorage.setItem('latest_progress', JSON.stringify(currentState));
      // copy and modify state array with the question removed (if correct)
      let newQuestionSet = currentState.splice(1, currentState.length - 1);
      if (newQuestionSet.length === 0) {
        endSession()
      }
      else setQuestionsState(newQuestionSet)
    }
    // CORRECT BUT NOT ON THE FIRST TRY (CONSIDERED A MISS)
    else if (questionsState[0].answers[radioSelection] === questionsState[0].correctAnswer && wrongAnswer) {
      setWrongAnswer(false);
      document.getElementById('inline-radio-' + radioSelection).checked = false;
      document.getElementById('answer' + radioSelection).style['background-color'] = '';
      let currentState = questionsState;
      currentState[0].correctCt += 1;
      currentState[0].viewCt += 1;
      currentState.push(currentState.splice(0, 1)[0]);
    }

    else {
      // WRONG ANSWER (CANNOT ADVANCE)
      if (questionsState.length !== 1) {
        setWrongAnswer(true)
      }
      let radioSelection = radioState;
      let currentState = questionsState;
      currentState[0].wrongCt += 1;
      document.getElementById('answer' + radioSelection).style['background-color'] = '#FFCCCB';
      let currentScore = currentState[0].score;
      if (currentScore > 0) {
        currentState[0].score -= 1
      }
      // localStorage.setItem('latest_progress', JSON.stringify(currentState)); this doesnt make sense if the questions are being removed...

      // logic about score, moving the card to the back of the stack, etc?




      // let newQuestionSet = currentState.push(currentState.splice(0, 1)[0]);

      // setQuestionsState(newQuestionSet)
    }
    // logic about score, moving the card to the back of the stack, etc?
  }

  return (
    <div className='col-auto mb-3'>



      <Card

        style={{ display: 'inline-flex', border: '4px dotted #9CFF19', minWidth: '50%', maxWidth: '50%', maxHeight: '50%', boxShadow: '4px 8px 14px rgb(113 137 255 / 55%)' }} className="text-center"

      >
        <Card.Header style={{ color: '#BF5700' }}><i>{questionsState[0].topic}</i></Card.Header>



        <Card.Body style={{ borderRadius: '0px !important', backgroundColor: 'white', width: 'auto' }}>

          {/* QUESTION */}
          <Card.Title style={{
            textAlign: questionsState[0].question.length < 80 ? 'center' : 'justify',
            paddingTop: '0.5vh', paddingBottom: '3vh', paddingLeft: '1vw', paddingRight: '1vw',
            fontSize: 'x-large'
          }}> {questionsState[0].question}</Card.Title>
          <Card.Subtitle>
            <Card.Link style={{
              cursor: isHovering ? 'pointer' : 'auto',
              textDecoration: 'none',
              color: !hintState ? '#C499FF' : 'grey'
            }}
              onMouseOver={toggleIsHovering}
              onMouseOut={toggleIsHovering}
              onClick={toggleHint}>{
                !hintState && questionsState[0].hint ? <i>Hint?</i> : questionsState[0].hint
              }

            </Card.Link>
          </Card.Subtitle>

          <Card.Text style={{ display: questionsState[0].subquestion !== '' ? 'inline-flex' : 'none' }}>{questionsState[0].subquestion}
          </Card.Text>



        </Card.Body>
        {/* MULTIPLE CHOICE */}
        <ListGroup variant='flush' as='ol' style={{ backgroundColor: '' }} >
          {
            questionsState[0].answers.map((answer, index) => (
              < Col xs='auto' id='answerGrid'>
            <ListGroup.Item as='li' id={'answer' + index} style={{ textAlign: 'left' }} >{answer}</ListGroup.Item>
          </Col >
            ))
          }
        </ListGroup>

        {/* SCANTRON */}  <Form style={{ backgroundColor: '#B5FFF2', paddingTop: '1.3vh' }}>
          <Container fluid>
            <div key={'inline-radio'} className="mb-3" >
              <Form.Check inline label="A" name="group1" type='radio' value={0} id='inline-radio-0' onClick={handleRadio} />
              <Form.Check inline label="B" name="group1" type='radio' value={1} id='inline-radio-1' onClick={handleRadio} />
              <Form.Check inline label="C" name="group1" type='radio' value={2} id='inline-radio-2' onClick={handleRadio} />
              <Form.Check inline label="D" name="group1" type='radio' value={3} id='inline-radio-3' onClick={handleRadio} />
            </div>
          </Container>
        </Form>

        <Card.Footer className="text-muted">
          <Button style={{ paddingTop: '0.2vh' }} type='submit' onClick={answerQuestion} disabled={btnDisabled}>Continue</Button>
        </Card.Footer>

      </Card >
    </div >
  );
};

export default Question