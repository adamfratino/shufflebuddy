import React, { useState, useEffect, createRef } from 'react';
import Draggable from 'react-draggable';
import { BiscuitContainer, Button, Court, Menu } from './styled';
import { Caret, Disc, LinesCanvas } from './components';
import {
  copyToClipboard,
  createLine,
  defaultPositions,
  loadPositions,
  removeLines,
  setLineCoords,
} from './utils';

let biscuitCoordParams = new URLSearchParams(window.location.search);
const originalCoordParams = new URLSearchParams(window.location.search).toString();
const DEFAULT_POSITIONS = defaultPositions();
const LOADED_POSITIONS = loadPositions(biscuitCoordParams);
const hasQueries = window.location.href.includes('?');

const App = () => {
  const linesCanvasRef = createRef();
  const [currentPositions, setCurrentPositions] = useState({ ...LOADED_POSITIONS });

  // probably best to combine these into one state object
  const [linesEnabled, setLinesEnabled] = useState(false);
  const [resetToggle, setResetToggle] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [copyUrlEnabled, setCopyUrlEnabled] = useState(false);
  const [isInitialBoard, setIsInitialBoard] = useState(!hasQueries ? true : false);
  const [hasMoved, setHasMoved] = useState(false);

  const handleStart = (e, el) => {
    const biscuitName = e.target.dataset.biscuit;
    const biscuitColor = e.target.classList.contains('yellow') ? 'yellow' : 'black';
    const { x, y } = el;

    if (linesEnabled) {
      createLine(linesCanvasRef.current, biscuitName, biscuitColor, x, y);
    }

    setCopyUrlEnabled(true);
  };

  const handleStop = (e, el) => {
    const biscuitName = e.target.dataset.biscuit;
    const { x, y } = el;

    biscuitCoordParams.set(biscuitName, `${x}-${y}`);
    setIsInitialBoard(false);
  };

  const handleDrag = (e, el) => {
    const biscuitName = e.target.dataset.biscuit;
    const { x, y } = el;
    const biscuitLine = document.querySelector(`.${biscuitName}`);

    if (biscuitLine) {
      setLineCoords(biscuitLine, x, y);
    }

    setCurrentPositions({
      ...currentPositions,
      [`${biscuitName}`]: { x: x, y: y },
    });

    setIsInitialBoard(false);
    setHasMoved(true);
  };

  const toggleLines = isLineEnabled => {
    setLinesEnabled(!isLineEnabled);
    removeLines(linesCanvasRef.current);
  };

  const resetBiscuits = () => {
    biscuitCoordParams = new URLSearchParams(originalCoordParams);
    setCurrentPositions({ ...LOADED_POSITIONS });
    setResetToggle(!resetToggle);
    removeLines(linesCanvasRef.current);
    setCopyUrlEnabled(false);
    setIsInitialBoard(!hasQueries ? true : false);
    setHasMoved(false);
  };

  const clearBoard = () => {
    biscuitCoordParams = new URLSearchParams('');
    setCurrentPositions({ ...DEFAULT_POSITIONS });
    removeLines(linesCanvasRef.current);
    setCopyUrlEnabled(false);
    setHasMoved(true);
    setIsInitialBoard(true);
  };

  const biscuits = Object.entries(LOADED_POSITIONS);
  useEffect(() => setCurrentPositions(LOADED_POSITIONS), []);

  return (
    <Court>
      <LinesCanvas ref={linesCanvasRef} className={menuActive ? 'is-disabled' : ''} />
      {biscuits.map(biscuit => (
        <Draggable
          bounds="parent"
          defaultPosition={{ x: biscuit[1].x, y: biscuit[1].y }}
          position={{
            x: currentPositions[biscuit[0]].x,
            y: currentPositions[biscuit[0]].y,
          }}
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
      <Menu className={menuActive ? 'is-open' : ''}>
        <Caret onClick={() => setMenuActive(!menuActive)} />
        {hasQueries && (
          <Button onClick={resetBiscuits} disabled={!hasMoved}>
            Reset Biscuits
          </Button>
        )}
        <Button onClick={() => toggleLines(linesEnabled)}>
          {linesEnabled ? 'Disable Lines' : 'Enable Lines'}
        </Button>
        <Button
          onClick={() => copyToClipboard(biscuitCoordParams)}
          disabled={!copyUrlEnabled}
        >
          Copy Link to Clipboard
        </Button>
        <Button onClick={clearBoard} disabled={isInitialBoard}>
          Clear Board
        </Button>
      </Menu>
    </Court>
  );
};

export default App;
