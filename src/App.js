import React, { useState, createRef } from 'react';
import Draggable from 'react-draggable';
import { lightSecondary, BISCUIT_SIZE } from './variables';
import { Container, Court, LinesCanvas, BiscuitContainer, Menu, Button } from './styles';
import { Board, Caret, Disc } from './components';
import { copyToClipboard, defaultPositions, removeLines } from './utils';

const biscuitCoordParams = new URLSearchParams(window.location.search);
const hasQueries = window.location.href.includes('?');

const App = () => {
  const linesCanvasRef = createRef();
  const defaultPos = defaultPositions();

  const [linesEnabled, setLinesEnabled] = useState(true);
  const [resetToggle, setResetToggle] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [copyUrlEnabled, setCopyUrlEnabled] = useState(hasQueries);
  const [positionOnLoad] = useState({
    y1: {
      x: biscuitCoordParams.has('y1')
        ? +biscuitCoordParams.get('y1').split('-')[0]
        : defaultPos.y1.x,
      y: biscuitCoordParams.has('y1')
        ? +biscuitCoordParams.get('y1').split('-')[1]
        : defaultPos.y1.y,
    },
    y2: {
      x: biscuitCoordParams.has('y2')
        ? +biscuitCoordParams.get('y2').split('-')[0]
        : defaultPos.y2.x,
      y: biscuitCoordParams.has('y2')
        ? +biscuitCoordParams.get('y2').split('-')[1]
        : defaultPos.y2.y,
    },
    y3: {
      x: biscuitCoordParams.has('y3')
        ? +biscuitCoordParams.get('y3').split('-')[0]
        : defaultPos.y3.x,
      y: biscuitCoordParams.has('y3')
        ? +biscuitCoordParams.get('y3').split('-')[1]
        : defaultPos.y3.y,
    },
    y4: {
      x: biscuitCoordParams.has('y4')
        ? +biscuitCoordParams.get('y4').split('-')[0]
        : defaultPos.y4.x,
      y: biscuitCoordParams.has('y4')
        ? +biscuitCoordParams.get('y4').split('-')[1]
        : defaultPos.y4.y,
    },
    b1: {
      x: biscuitCoordParams.has('b1')
        ? +biscuitCoordParams.get('b1').split('-')[0]
        : defaultPos.b1.x,
      y: biscuitCoordParams.has('b1')
        ? +biscuitCoordParams.get('b1').split('-')[1]
        : defaultPos.b1.y,
    },
    b2: {
      x: biscuitCoordParams.has('b2')
        ? +biscuitCoordParams.get('b2').split('-')[0]
        : defaultPos.b2.x,
      y: biscuitCoordParams.has('b2')
        ? +biscuitCoordParams.get('b2').split('-')[1]
        : defaultPos.b2.y,
    },
    b3: {
      x: biscuitCoordParams.has('b3')
        ? +biscuitCoordParams.get('b3').split('-')[0]
        : defaultPos.b3.x,
      y: biscuitCoordParams.has('b3')
        ? +biscuitCoordParams.get('b3').split('-')[1]
        : defaultPos.b3.y,
    },
    b4: {
      x: biscuitCoordParams.has('b4')
        ? +biscuitCoordParams.get('b4').split('-')[0]
        : defaultPos.b4.x,
      y: biscuitCoordParams.has('b4')
        ? +biscuitCoordParams.get('b4').split('-')[1]
        : defaultPos.b4.y,
    },
  });

  const handleStart = (e, el) => {
    const biscuitName = e.target.dataset.biscuit;
    const { x, y } = el;
    const biscuitLine = document.querySelector(`.${biscuitName}`);

    setCopyUrlEnabled(true);

    if (linesEnabled) {
      if (biscuitLine) {
        biscuitLine.remove();
      }

      linesCanvasRef.current.innerHTML += `
        <svg class="${biscuitName}">
          <circle
            r="${BISCUIT_SIZE / 2}"
            cx="${x + BISCUIT_SIZE / 2}"
            cy="${y + BISCUIT_SIZE / 2}"
            fill="${e.target.classList.contains('yellow') ? 'yellow' : 'black'}"
          />
          <line
            stroke-width="3px"
            stroke-dasharray="5px"
            stroke="${lightSecondary}"
            x1="${x + BISCUIT_SIZE / 2}"
            y1="${y + BISCUIT_SIZE / 2}"
            x2="${x + BISCUIT_SIZE / 2}"
            y2="${y + BISCUIT_SIZE / 2}"
          />
        </svg>
      `;
    }
  };

  const handleStop = (e, el) => {
    const biscuitName = e.target.dataset.biscuit;
    const { x, y } = el;
    biscuitCoordParams.set(biscuitName, `${x}-${y}`);
  };

  const handleDrag = (e, el) => {
    const biscuitName = e.target.dataset.biscuit;
    const { x, y } = el;
    const biscuitLine = document.querySelector(`.${biscuitName}`);

    if (biscuitLine) {
      biscuitLine.querySelector('line').setAttribute('x2', x + BISCUIT_SIZE / 2);
      biscuitLine.querySelector('line').setAttribute('y2', y + BISCUIT_SIZE / 2);
    }
  };

  const toggleLines = isLineEnabled => {
    setLinesEnabled(!isLineEnabled);
    removeLines(linesCanvasRef.current);
  };

  const resetBoard = () => {
    setResetToggle(!resetToggle);
    removeLines(linesCanvasRef.current);
    setCopyUrlEnabled(false);
  };

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const biscuits = Object.entries(positionOnLoad);

  return (
    <Container>
      <Court>
        <LinesCanvas ref={linesCanvasRef} className={menuActive ? 'is-disabled' : ''} />
        {biscuits.map(biscuit => (
          <Draggable
            bounds="parent"
            defaultPosition={{ x: biscuit[1].x, y: biscuit[1].y }}
            onStart={handleStart}
            onStop={handleStop}
            onDrag={handleDrag}
            key={`${biscuit[0]}_${resetToggle}`}
          >
            <BiscuitContainer className={menuActive ? 'is-disabled' : ''}>
              <Disc
                className={biscuit[0].includes('y') ? 'yellow' : 'black'}
                biscuit={biscuit[0]}
              />
            </BiscuitContainer>
          </Draggable>
        ))}
        <Board />
        <Menu className={menuActive ? 'is-open' : ''}>
          <Caret onClick={toggleMenu} />
          <Button onClick={resetBoard}>Reset Biscuits</Button>
          <Button onClick={() => toggleLines(linesEnabled)}>
            {linesEnabled ? 'Disable Lines' : 'Enable Lines'}
          </Button>
          <Button
            onClick={() => copyToClipboard(biscuitCoordParams)}
            disabled={!copyUrlEnabled}
          >
            Copy Link to Clipboard
          </Button>
        </Menu>
      </Court>
    </Container>
  );
};

export default App;
