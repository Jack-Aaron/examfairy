import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import AnswerGrid from '../AnswerGrid';
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
    // console.log(document.getElementById('inline-radio-' + tag).checked === false)
    document.getElementById('inline-radio-' + tag).checked = false;
  // dynamically change answer background color on selection
  const handleBgColor = (tag, color) => {
    if (document.getElementById('answer' + tag)
      .style['backgroundColor'] !== color)
      document.getElementById('answer' + tag)
        .style['backgroundColor'] = color
  }
  const handleRadio = e => {
    let beRadioState = e.target.value;
    setRadioState(beRadioState);
    setBtnDisabled(false); // submit button activates
    for (let i = 0; i < 4; i++) { handleBgColor(i, '') } // resets colors
    handleBgColor(beRadioState, '#EFFBFF') // changes current selection
  }
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [wrongAnswer, setWrongAnswer] = useState(false); // determines logic flow later
  // strikeout bad answer effects for users
  const toggleStrikethrough = (tag) => {
    if (document.getElementById(tag).style['text-decoration'] === 'none') document.getElementById(tag).style['text-decoration'] = 'line-through'
    else document.getElementById(tag).style['text-decoration'] = 'none'
  }

  // user submits answer on question card
  const submitAnswer = () => {
    console.log('poop');
    let beRadioState = radioState;
    setHintState(false);
    setBtnDisabled(true);
    // CORRECT ANSWER
    if (questionsState[0].answers[beRadioState] === questionsState[0].correctAnswer && !wrongAnswer) {
      clearRadioBtn(beRadioState);
      handleBgColor(beRadioState, '');
      // update score and iterate question's appearence
      setQuestionsState({
        questionsState: {
          ...questionsState[0], score: questionsState.score + 1, correctCt: questionsState.correctCt + 1, viewCt: questionsState.viewCt + 1
        }
      })
      // add to progress state
      let storageArr = [];
      if (storageClone.length > 0) storageArr = storageClone;
      storageArr.push(questionsState[0]);
      setStorageClone(storageArr);
      // copy and modify state array with the question removed (if correct)
      let newQuestionSet = questionsState.splice(1, questionsState.length - 1);
      if (newQuestionSet.length === 0) endSession()
      else setQuestionsState(newQuestionSet)
    }
    // CORRECT BUT NOT ON THE FIRST SELECTION (CONSIDERED A MISS)
    else if (questionsState[0].answers[beRadioState] === questionsState[0].correctAnswer && wrongAnswer) {
      setWrongAnswer(false); // removes this tag for keeping score
      clearRadioBtn(beRadioState); // reset button selection
      handleBgColor(beRadioState, ''); // reset answer bg color
      let questionsState = questionsState;
      questionsState[0].viewCt++ // iterate the question's rotation
      if (questionsState.length > 1) questionsState.push(questionsState.splice(0, 1)[0]); // puts question to back of queue
      else {
        let storageArr = [];
        if (storageClone.length > 0) storageArr = storageClone;
        storageArr.push(questionsState[0]);
        setStorageClone(storageArr);
        endSession()
      }
    }
    // WRONG ANSWER (CANNOT ADVANCE)
    else {
      setWrongAnswer(true); // marked for scoring
      let questionsState = questionsState;
      questionsState[0].wrongCt++
      let currentScore = questionsState[0].score; // update score for this question
      if (currentScore > 0) questionsState[0].score--;
      handleBgColor(radioState, '#FFCCCB');
    }
  }

  return (
    <Container fluid className='col-auto mb-3 questionContainer'>
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
        <AnswerGrid className='answer' as='ol'
          questionsState={questionsState} toggleStrikethrough={toggleStrikethrough}
        />

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