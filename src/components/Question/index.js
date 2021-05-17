import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import './style.css';

const Question = ({ questionsState, setQuestionsState, storageClone, setStorageClone, endSession }) => {
  // manages hint display and mouse cursor
  const [hintState, setHintState] = useState(false);
  const toggleHint = () => setHintState(true);
  const [isHovering, setIsHovering] = useState(false);
  const toggleIsHovering = () => setIsHovering(!isHovering);
  // manages radio button control
  const [radioState, setRadioState] = useState();
  const clearRadioBtn = (tag) =>
    document.getElementById('inline-radio-' + tag).checked = false;
  // dynamically change answer background color on selection
  const handleBgColor = (tag, color) => {
    if (document.getElementById('answer' + tag)
      .style['backgroundColor'] !== color)
      document.getElementById('answer' + tag)
        .style['backgroundColor'] = color
  }
  const handleRadio = e => {
    let radioSelection = e.target.value;
    handleBgColor(radioSelection, '#EFFBFF')
    setRadioState(radioSelection);
    setBtnDisabled(false); // submit button activates
    for (let i = 0; i < 4; i++) { handleBgColor(i, '') } // resets colors
    handleBgColor(radioSelection, '#EFFBFF') // changes current selection
  }
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [wrongAnswer, setWrongAnswer] = useState(false); // determines logic flow later

  const submitAnswer = () => {

    setHintState(false);
    setBtnDisabled(true);
    let currentState = questionsState; // copy state object
    let radioSelection = radioState; // get answer election
    // CORRECT ANSWER
    if (questionsState[0].answers[radioSelection] === questionsState[0].correctAnswer && !wrongAnswer) {
      clearRadioBtn(radioSelection);
      handleBgColor(radioSelection, '');
      // update score
      currentState[0].score++
      currentState[0].correctCt++
      currentState[0].viewCt++ // iterate the question's rotation
      // add to progress state
      let storageArr = [];
      if (storageClone.length > 0) storageArr = storageClone;
      console.log(storageArr)
      console.log(currentState)
      storageArr.push(currentState[0]);
      console.log(storageArr);

      setStorageClone(storageArr);
      // LOG QUESTION REPORTS
      console.log(
        `REPORT ON QUESTION #${currentState[0].id}:`
      );
      console.group()
      console.log('viewCt: ' + currentState[0].viewCt);
      console.log('wrongCt: ' + currentState[0].wrongCt);
      console.log('correctCt: ' + currentState[0].correctCt);
      console.groupEnd()
      console.group()
      console.log('score: ' + currentState[0].score);
      console.groupEnd()
      console.group()
      console.log('subject: ' + currentState[0].topic);
      console.groupEnd()
      // copy and modify state array with the question removed (if correct)
      let newQuestionSet = currentState.splice(1, currentState.length - 1);
      if (newQuestionSet.length === 0) endSession()
      else setQuestionsState(newQuestionSet)
    }
    // CORRECT BUT NOT ON THE FIRST SELECTION (CONSIDERED A MISS)
    else if (questionsState[0].answers[radioSelection] === questionsState[0].correctAnswer && wrongAnswer) {
      setWrongAnswer(false); // removes this tag for keeping score
      clearRadioBtn(radioSelection); // reset button selection
      handleBgColor(radioSelection, ''); // reset answer bg color
      let currentState = questionsState;
      currentState[0].viewCt++ // iterate the question's rotation
      if (questionsState.length > 1) currentState.push(currentState.splice(0, 1)[0]); // puts question to back of queue
      else {
        let storageArr = [];
        if (storageClone.length > 0) storageArr = storageClone;
        console.log(currentState)
        storageArr.push(currentState[0]);
        setStorageClone(storageArr);
        endSession()
      }
    }
    // WRONG ANSWER (CANNOT ADVANCE)
    else {
      setWrongAnswer(true); // marked for scoring
      let currentState = questionsState;
      currentState[0].wrongCt++
      let currentScore = currentState[0].score; // update score for this question
      if (currentScore > 0) currentState[0].score--
      handleBgColor(radioState, '#FFCCCB');
    }
  }

  return (
    <Container fluid className='col-auto mb-3'>
      <Card className='questionCard'>
        <Card.Header>{questionsState[0].topic}</Card.Header>
        <Card.Body>

          {/* QUESTION */}
          <Card.Title style={{ textAlign: questionsState[0].question.length > 80 ? 'justify' : 'center' }}>{questionsState[0].question}</Card.Title>
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
          <Button type='submit' onClick={submitAnswer} disabled={btnDisabled}>Continue</Button>
        </Card.Footer>
      </Card >
    </Container>
  );
};

export default Question