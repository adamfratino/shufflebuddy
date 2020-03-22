import React, { useState, createRef } from 'react';
import Draggable from 'react-draggable';
import { BiscuitContainer, Button, Container, Court, Menu } from './styled';
import { Board, Caret, Disc, LinesCanvas } from './components';
import {
  copyToClipboard,
  createLine,
  loadPositions,
  removeLines,
  setLineCoords,
} from './utils';

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
    const biscuitColor = e.target.classList.contains('yellow') ? 'yellow' : 'black';
    const { x, y } = el;
    if (linesEnabled) createLine(linesCanvasRef.current, biscuitName, biscuitColor, x, y);
    setCopyUrlEnabled(true);
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
    if (biscuitLine) setLineCoords(biscuitLine, x, y);
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
          <Caret onClick={() => setMenuActive(!menuActive)} />
          <Button onClick={resetBiscuits} disabled={false}>
            Reset Biscuits
          </Button>
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
