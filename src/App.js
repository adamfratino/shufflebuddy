import React, { useState, createRef } from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';
import { darkPrimary, lightPrimary, lightSecondary } from './colors';
import { Board, Disc } from './components';

const BISCUIT_SIZE = 50;
const biscuitCoordParams = new URLSearchParams(window.location.search);

const App = () => {
  const linesCanvasRef = createRef();

  const [position] = useState({
    y1: {
      x: biscuitCoordParams.has('y1') ? +biscuitCoordParams.get('y1').split('-')[0] : 10,
      y: biscuitCoordParams.has('y1') ? +biscuitCoordParams.get('y1').split('-')[1] : window.innerHeight - (BISCUIT_SIZE + 190),
    },
    y2: {
      x: biscuitCoordParams.has('y2') ? +biscuitCoordParams.get('y2').split('-')[0] : 10,
      y: biscuitCoordParams.has('y2') ? +biscuitCoordParams.get('y2').split('-')[1] : window.innerHeight - (BISCUIT_SIZE + 130),
    },
    y3: {
      x: biscuitCoordParams.has('y3') ? +biscuitCoordParams.get('y3').split('-')[0] : 10,
      y: biscuitCoordParams.has('y3') ? +biscuitCoordParams.get('y3').split('-')[1] : window.innerHeight - (BISCUIT_SIZE + 70),
    },
    y4: {
      x: biscuitCoordParams.has('y4') ? +biscuitCoordParams.get('y4').split('-')[0] : 10,
      y: biscuitCoordParams.has('y4') ? +biscuitCoordParams.get('y4').split('-')[1] : window.innerHeight - (BISCUIT_SIZE + 10),
    },
    b1: {
      x: biscuitCoordParams.has('b1') ? +biscuitCoordParams.get('b1').split('-')[0] : widthDetection(),
      y: biscuitCoordParams.has('b1') ? +biscuitCoordParams.get('b1').split('-')[1] : window.innerHeight - (BISCUIT_SIZE + 190),
    },
    b2: {
      x: biscuitCoordParams.has('b2') ? +biscuitCoordParams.get('b2').split('-')[0] : widthDetection(),
      y: biscuitCoordParams.has('b2') ? +biscuitCoordParams.get('b2').split('-')[1] : window.innerHeight - (BISCUIT_SIZE + 130),
    },
    b3: {
      x: biscuitCoordParams.has('b3') ? +biscuitCoordParams.get('b3').split('-')[0] : widthDetection(),
      y: biscuitCoordParams.has('b3') ? +biscuitCoordParams.get('b3').split('-')[1] : window.innerHeight - (BISCUIT_SIZE + 70),
    },
    b4: {
      x: biscuitCoordParams.has('b4') ? +biscuitCoordParams.get('b4').split('-')[0] : widthDetection(),
      y: biscuitCoordParams.has('b4') ? +biscuitCoordParams.get('b4').split('-')[1] : window.innerHeight - (BISCUIT_SIZE + 10),
    }
  });

  const biscuits = Object.entries(position);

  const handleStart = (e, el) => {
    const biscuitName = e.target.dataset.biscuit;
    const biscuitLine = document.querySelector(`.${biscuitName}`);

    if (biscuitLine) {
      biscuitLine.remove();
    }

    linesCanvasRef.current.innerHTML += `
      <svg class="${biscuitName}">
        <line
          stroke-width="3px"
          stroke-dasharray="5px"
          stroke="${lightSecondary}"
          x1="${el.x + BISCUIT_SIZE/2}"
          y1="${el.y + BISCUIT_SIZE/2}"
          x2="${el.x + BISCUIT_SIZE/2}"
          y2="${el.y + BISCUIT_SIZE/2}"
        />
      </svg>
    `;
  };

  const handleStop = (e, el) => {
    const biscuit = e.target.dataset.biscuit;

    biscuitCoordParams.set(biscuit, `${el.x}-${el.y}`);
  };

  const handleDrag = (e, el) => {
    const biscuitName = e.target.dataset.biscuit;
    const biscuitLine = document.querySelector(`.${biscuitName}`);

    if (biscuitLine) {
      biscuitLine.querySelector('line').setAttribute('x2', el.x + 25);
      biscuitLine.querySelector('line').setAttribute('y2', el.y + 25);
    }
  }

  return (
    <Container>
      <Court>
        <LinesCanvas ref={linesCanvasRef} />
        {biscuits.map(biscuit =>
          <Draggable
            bounds="parent"
            defaultPosition={{ x: biscuit[1].x, y: biscuit[1].y }}
            onStart={handleStart}
            onStop={handleStop}
            onDrag={handleDrag}
            key={biscuit[0]}
          >
            <div className="biscuit-container">
              <Disc
                className={biscuit[0].includes('y') ? 'yellow' : 'black'}
                biscuit={biscuit[0]}
              />
            </div>
          </Draggable>
        )};
        <Board />
        <CopyButton onClick={copyToClipboard}>Copy Link</CopyButton>
      </Court>
    </Container>
  );
};

export default App;

const widthDetection = () => {
  if (window.innerWidth > 620) {
    return 620 - 110;
  } else {
    return window.innerWidth - 70;
  }
};

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

  .biscuit-container {
    z-index: 10;
    position: absolute;
    & > span {
      height: ${BISCUIT_SIZE}px;
      width: ${BISCUIT_SIZE}px;
    }
    &.react-draggable-dragging > span {
      transform: scale(1.3);
    }
  }
`;

const CopyButton = styled.button`
  appearance: none;
  font-weight: 900;
  border-radius: 3px;
  text-transform: uppercase;
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 10px 20px;
  width: 150px;
  display: inline-block;
  background-color: white;
  transition: background-color 150ms ease;
  cursor: pointer;
  &:hover {
    background-color: beige;
  }
`;

const LinesCanvas = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 5;

  svg {
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
  }
`;
