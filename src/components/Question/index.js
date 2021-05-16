import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import './style.css';

const Question = ({ questionsState, setQuestionsState, endSession }) => {
  // manages hint display and mouse cursor
  const [hintState, setHintState] = useState(false);
  const toggleHint = () => setHintState(true)
  const [isHovering, setIsHovering] = useState(false);
  const toggleIsHovering = () => setIsHovering(!isHovering)
  // manages radio button control
  const [radioState, setRadioState] = useState();
  const changeBgColor = (prefix, tag, color) => {
    document.getElementById(`${prefix}` + tag).style['background-color'] = `${color}`
  }
  const handleRadio = e => {
    let radioSelection = e.target.value;
    setRadioState(radioSelection);
    setBtnDisabled(false);
    for (let i = 0; i < 4; i++) {
      changeBgColor('answer', i, '')
    }
    document.getElementById('answer' + radioSelection).style['background-color'] = '#EFFBFF'
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
    }
  }

  return (
    <div className='col-auto mb-3'>
      <Card className='questionCard'>
        <Card.Header>{questionsState[0].topic}</Card.Header>
        <Card.Body>

          {/* QUESTION */}
          <Card.Title>{questionsState[0].question}</Card.Title>
          <Card.Subtitle>
            <Card.Link style={{
              cursor: isHovering ? 'pointer' : 'auto',
              color: !hintState ? '#C499FF' : 'grey'
            }}
              onMouseOver={toggleIsHovering}
              onMouseOut={toggleIsHovering}
              onClick={toggleHint}>{!hintState && questionsState[0].hint ?
                <i>Hint?</i> : questionsState[0].hint}
            </Card.Link>
          </Card.Subtitle>
          {/* --SUBQUESTION */}
          <Card.Text style={{
            display: questionsState[0].subquestion !== ''
              ? 'inline-flex' : 'none'
          }}>{questionsState[0].subquestion}
          </Card.Text>
        </Card.Body>

        {/* MULTIPLE CHOICE */}
        <ListGroup as='ol'><ol type='A'>
          {questionsState[0].answers.map((answer, index) => (
            <ListGroup.Item id={'answer' + index} className='answer'>
              <li>{answer}</li>
            </ListGroup.Item>
          ))}</ol></ListGroup>

        {/* SCANTRON */}
        <Form><Container key={'inline-radio'} className='mb-3'>
          <Form.Check inline label='A' name='radioGroup1' type='radio' value={0} id='inline-radio-0' onClick={handleRadio} />
          <Form.Check inline label='B' name='radioGroup1' type='radio' value={1} id='inline-radio-1' onClick={handleRadio} />
          <Form.Check inline label='C' name='radioGroup1' type='radio' value={2} id='inline-radio-2' onClick={handleRadio} />
          <Form.Check inline label='D' name='radioGroup1' type='radio' value={3} id='inline-radio-3' onClick={handleRadio} />
        </Container></Form>

        <Card.Footer className='text-muted'>
          <Button type='submit' onClick={answerQuestion} disabled={btnDisabled}>Continue</Button>
        </Card.Footer>
      </Card >
    </div >
  );
};

export default Question