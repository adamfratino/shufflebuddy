import React, { useState, createRef } from 'react';
import Draggable from 'react-draggable';
import { lightSecondary, BISCUIT_SIZE } from './variables';
import { Container, Court, LinesCanvas, BiscuitContainer, Menu, Button } from './styles';
import { Board, Caret, Disc } from './components';
import { copyToClipboard, loadPositions, removeLines } from './utils';

const biscuitCoordParams = new URLSearchParams(window.location.search);
const hasQueries = window.location.href.includes('?');

const App = () => {
  const linesCanvasRef = createRef();
  const loadedPositions = loadPositions(biscuitCoordParams);

  const [linesEnabled, setLinesEnabled] = useState(true);
  const [resetToggle, setResetToggle] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [copyUrlEnabled, setCopyUrlEnabled] = useState(hasQueries);

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

  const resetBiscuits = () => {
    setResetToggle(!resetToggle);
    removeLines(linesCanvasRef.current);
    setCopyUrlEnabled(false);
  };

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const biscuits = Object.entries(loadedPositions);

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
          <Button onClick={resetBiscuits}>Reset Biscuits</Button>
          <Button onClick={() => toggleLines(linesEnabled)}>
            {linesEnabled ? 'Disable Lines' : 'Enable Lines'}
          </Button>
          <Button
            onClick={() => copyToClipboard(biscuitCoordParams)}
            disabled={!copyUrlEnabled}
          >
            Copy Link to Clipboard
          </Button>
          <Button>Clear Board</Button>
        </Menu>
      </Court>
    </Container>
  );
};

export default App;
