import React, { useState } from 'react';
import { Transition } from 'react-transition-group';
import AdvanceBtn from '../AdvanceBtn';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import cardContent from '../../cardContent';



const Flashcard = ({ cardsState, setCardsState, cardFlippedState, setCardFlippedState }) => {

  const toggleFlip = () => { if (!cardFlippedState) setCardFlippedState(true) };

  const [hintState, setHintState] = useState(false);

  const [isHovering, setIsHovering] = useState(false);

  const toggleIsHovering = () => {
    setIsHovering(!isHovering)
  }
  const [hintBorderState, setHintBorderState] = useState(false);

  const toggleHint = () => {
    setHintBorderState(true);
    setHintState(true)
  }

  return (
    <div className='col-auto mb-3'>



      <Card border={hintBorderState && !cardFlippedState ? 'info' : 'light'}

        style={{ display: 'inline-flex', minWidth: '50%', maxWidth: '50%', maxHeight: '50%', boxShadow: `0 2px 10px rgb(43 44 40 / 20%)`, border: '0px !important', borderRadius: '0px !important' }} className="text-center"

      >
        <Card.Header><i>{cardsState[0].topic}</i></Card.Header>



        <Card.Body onClick={toggleFlip} style={{ backgroundColor: 'white', width: 'auto' }}>




          <Card.Title style={!cardFlippedState ? {
            paddingTop: '1vh', paddingBottom: '1vh',
            fontSize: 'xxx-large'
          } : { fontSize: 'xx-large' }
          }> {cardsState[0].front}</Card.Title>

          {

            cardFlippedState ? <Card.Text style={{ fontSize: 'x-large' }}>
              {cardsState[0].back}
            </Card.Text> : null


          }
          <Card.Subtitle>{hintState && !cardFlippedState ? cardsState[0].hint : null}</Card.Subtitle>

        </Card.Body>
        <Card.Footer style={{ visibility: !hintState || cardFlippedState ? 'visible' : 'hidden' }} className="text-muted">

          {
            !cardFlippedState ?
              <Row>
                <Col>
                  <Card.Link style={{
                    cursor: isHovering ? 'pointer' : 'auto',
                    textDecoration: 'none'
                  }}
                    onMouseOver={toggleIsHovering}
                    onMouseOut={toggleIsHovering}
                    onClick={toggleHint}>{
                      !hintState ? <i>Hint?</i> : ''
                    }

                  </Card.Link>
                </Col>
              </Row>
              :
              <Row>
                <Col>
                  <AdvanceBtn cardsState={cardsState} setCardScore={setCardsState} id='correct' variant={'danger'} text={'I Still Need Practice!'} />
                </Col>
                <Col>
                  <AdvanceBtn cardsState={cardsState} setCardScore={setCardsState} id='unknown' variant={'success'} text={'I Know This!'} />
                </Col></Row>
          }
        </Card.Footer>
      </Card>
    </div >
  );
};

export default Flashcard;