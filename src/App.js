import React, { useState } from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';
import { darkPrimary, lightPrimary } from './colors';
import { Board, Disc } from './components';

const BISCUIT_SIZE = 50;

const widthDetection = () => {
  if (window.innerWidth > 620) {
    return 620 - 110;
  } else {
    return window.innerWidth - 70;
  }
};

const App = () => {
  const biscuitCoordParams = new URLSearchParams(window.location.search);

  const copyToClipboard = () => {
    const str = `${window.location}?${biscuitCoordParams}`
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };


  const [position] = useState({
    y1x: biscuitCoordParams.has('y1') ? +biscuitCoordParams.get('y1').split('-')[0] : 10,
    y1y: biscuitCoordParams.has('y1') ? +biscuitCoordParams.get('y1').split('-')[1] : window.innerHeight - (BISCUIT_SIZE + 190),
    y2x: biscuitCoordParams.has('y2') ? +biscuitCoordParams.get('y2').split('-')[0] : 10,
    y2y: biscuitCoordParams.has('y2') ? +biscuitCoordParams.get('y2').split('-')[1] : window.innerHeight - (BISCUIT_SIZE + 130),
    y3x: biscuitCoordParams.has('y3') ? +biscuitCoordParams.get('y3').split('-')[0] : 10,
    y3y: biscuitCoordParams.has('y3') ? +biscuitCoordParams.get('y3').split('-')[1] : window.innerHeight - (BISCUIT_SIZE + 70),
    y4x: biscuitCoordParams.has('y4') ? +biscuitCoordParams.get('y4').split('-')[0] : 10,
    y4y: biscuitCoordParams.has('y4') ? +biscuitCoordParams.get('y4').split('-')[1] : window.innerHeight - (BISCUIT_SIZE + 10),
    b1x: biscuitCoordParams.has('b1') ? +biscuitCoordParams.get('b1').split('-')[0] : widthDetection(),
    b1y: biscuitCoordParams.has('b1') ? +biscuitCoordParams.get('b1').split('-')[1] : window.innerHeight - (BISCUIT_SIZE + 190),
    b2x: biscuitCoordParams.has('b2') ? +biscuitCoordParams.get('b2').split('-')[0] : widthDetection(),
    b2y: biscuitCoordParams.has('b2') ? +biscuitCoordParams.get('b2').split('-')[1] : window.innerHeight - (BISCUIT_SIZE + 130),
    b3x: biscuitCoordParams.has('b3') ? +biscuitCoordParams.get('b3').split('-')[0] : widthDetection(),
    b3y: biscuitCoordParams.has('b3') ? +biscuitCoordParams.get('b3').split('-')[1] : window.innerHeight - (BISCUIT_SIZE + 70),
    b4x: biscuitCoordParams.has('b4') ? +biscuitCoordParams.get('b4').split('-')[0] : widthDetection(),
    b4y: biscuitCoordParams.has('b4') ? +biscuitCoordParams.get('b4').split('-')[1] : window.innerHeight - (BISCUIT_SIZE + 10),
  });

  const handleStop = (e, el) => {
    const biscuitName = e.target.dataset.biscuit;
    biscuitCoordParams.set(biscuitName, `${el.x}-${el.y}`);
    // copyToClipboard(${window.location.pathname}?${biscuitCoordParams});
    // window.history.replaceState({}, '', `${window.location.pathname}?${biscuitCoordParams}`);
    console.log(`${window.location}?${biscuitCoordParams}`)
  };

  return (
    <Container>
      <Court>
        <Draggable
          bounds="parent"
          defaultPosition={{ x: position.y1x, y: position.y1y }}
          onStop={handleStop}
        >
          <div><Disc className="yellow" biscuit="y1" /></div>
        </Draggable>
        <Draggable
          bounds="parent"
          defaultPosition={{ x: position.y2x, y: position.y2y }}
          onStop={handleStop}
        >
          <div><Disc className="yellow" biscuit="y2" /></div>
        </Draggable>
        <Draggable
          bounds="parent"
          defaultPosition={{ x: position.y3x, y: position.y3y }}
          onStop={handleStop}
        >
          <div><Disc className="yellow" biscuit="y3" /></div>
        </Draggable>
        <Draggable
          bounds="parent"
          defaultPosition={{ x: position.y4x, y: position.y4y }}
          onStop={handleStop}
        >
          <div><Disc className="yellow" biscuit="y4" /></div>
        </Draggable>
        <Draggable
          bounds="parent"
          onStop={handleStop}
          defaultPosition={{ x: position.b1x, y: position.b1y }}
        >
          <div><Disc className="black" biscuit="b1" /></div>
        </Draggable>
        <Draggable
          bounds="parent"
          onStop={handleStop}
          defaultPosition={{ x: position.b2x, y: position.b2y }}
        >
          <div><Disc className="black" biscuit="b2" /></div>
        </Draggable>
        <Draggable
          bounds="parent"
          onStop={handleStop}
          defaultPosition={{ x: position.b3x, y: position.b3y }}
        >
          <div><Disc className="black" biscuit="b3" /></div>
        </Draggable>
        <Draggable
          bounds="parent"
          onStop={handleStop}
          defaultPosition={{ x: position.b4x, y: position.b4y }}
        >
          <div><Disc className="black" biscuit="b4" /></div>
        </Draggable>
        <Board />
        <CopyButton onClick={copyToClipboard}>Copy Board Link</CopyButton>
      </Court>
    </Container>
  );
};

export default App;

const Container = styled.main`
  overflow: hidden;
  display: flex;
  justify-content: center;
  background: ${darkPrimary};
`;

const Court = styled.div`
  position: relative;
  background: ${lightPrimary};
  width: 100%;
  height: 100vh;
  max-width: 620px;
  box-shadow: 0 0 40px -10px black;
  border-left: 20px solid white;
  border-right: 20px solid white;

  @media (max-width: 620px) {
    border: none;
  };

  & > div {
    position: absolute;
    & > span {
      height: ${BISCUIT_SIZE}px;
      width: ${BISCUIT_SIZE}px;
    }
    &.react-draggable-dragging > span {
      transform: scale(2);
    }
  }
`;

const CopyButton = styled.button`
appearance: none;
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 10px 20px;
  width: 150px;
  display: inline-block;
  background: beige;
`;
