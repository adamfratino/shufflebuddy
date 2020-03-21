import React, { useState, createRef } from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';
import { darkPrimary, lightPrimary, lightSecondary } from './colors';
import { Board, Caret, Disc } from './components';

const BISCUIT_SIZE = 50;
const COLLAPSED_MENU_HEIGHT = 80;
const biscuitCoordParams = new URLSearchParams(window.location.search);
const hasQueries = window.location.href.includes('?');

const App = () => {
  const linesCanvasRef = createRef();

  const [linesEnabled, setLinesEnabled] = useState(false);
  const [resetToggle, setResetToggle] = useState(false);
  const [menuToggle, setMenuToggle] = useState(false);
  const [copyUrlEnabled, setCopyUrlEnabled] = useState(hasQueries);

  const [position] = useState({
    y1: {
      x: biscuitCoordParams.has('y1') ? +biscuitCoordParams.get('y1').split('-')[0] : 10,
      y: biscuitCoordParams.has('y1') ? +biscuitCoordParams.get('y1').split('-')[1] : window.innerHeight - (BISCUIT_SIZE + COLLAPSED_MENU_HEIGHT + 190),
    },
    y2: {
      x: biscuitCoordParams.has('y2') ? +biscuitCoordParams.get('y2').split('-')[0] : 10,
      y: biscuitCoordParams.has('y2') ? +biscuitCoordParams.get('y2').split('-')[1] : window.innerHeight - (BISCUIT_SIZE + COLLAPSED_MENU_HEIGHT + 130),
    },
    y3: {
      x: biscuitCoordParams.has('y3') ? +biscuitCoordParams.get('y3').split('-')[0] : 10,
      y: biscuitCoordParams.has('y3') ? +biscuitCoordParams.get('y3').split('-')[1] : window.innerHeight - (BISCUIT_SIZE + COLLAPSED_MENU_HEIGHT + 70),
    },
    y4: {
      x: biscuitCoordParams.has('y4') ? +biscuitCoordParams.get('y4').split('-')[0] : 10,
      y: biscuitCoordParams.has('y4') ? +biscuitCoordParams.get('y4').split('-')[1] : window.innerHeight - (BISCUIT_SIZE + COLLAPSED_MENU_HEIGHT + 10),
    },
    b1: {
      x: biscuitCoordParams.has('b1') ? +biscuitCoordParams.get('b1').split('-')[0] : widthDetection(),
      y: biscuitCoordParams.has('b1') ? +biscuitCoordParams.get('b1').split('-')[1] : window.innerHeight - (BISCUIT_SIZE + COLLAPSED_MENU_HEIGHT + 190),
    },
    b2: {
      x: biscuitCoordParams.has('b2') ? +biscuitCoordParams.get('b2').split('-')[0] : widthDetection(),
      y: biscuitCoordParams.has('b2') ? +biscuitCoordParams.get('b2').split('-')[1] : window.innerHeight - (BISCUIT_SIZE + COLLAPSED_MENU_HEIGHT + 130),
    },
    b3: {
      x: biscuitCoordParams.has('b3') ? +biscuitCoordParams.get('b3').split('-')[0] : widthDetection(),
      y: biscuitCoordParams.has('b3') ? +biscuitCoordParams.get('b3').split('-')[1] : window.innerHeight - (BISCUIT_SIZE + COLLAPSED_MENU_HEIGHT + 70),
    },
    b4: {
      x: biscuitCoordParams.has('b4') ? +biscuitCoordParams.get('b4').split('-')[0] : widthDetection(),
      y: biscuitCoordParams.has('b4') ? +biscuitCoordParams.get('b4').split('-')[1] : window.innerHeight - (BISCUIT_SIZE + COLLAPSED_MENU_HEIGHT + 10),
    }
  });

  const biscuits = Object.entries(position);

  const handleStart = (e, el) => {
    const biscuitName = e.target.dataset.biscuit;
    const biscuitLine = document.querySelector(`.${biscuitName}`);

    setCopyUrlEnabled(true);

    if (linesEnabled) {
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
    }
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

  const removeLines = () => linesCanvasRef.current.innerHTML = '';

  const toggleLines = () => {
    setLinesEnabled(!linesEnabled);
    removeLines();
  };

  const resetBoard = () => {
    setResetToggle(!resetToggle);
    removeLines();
    setCopyUrlEnabled(false);
  };

  const toggleMenu = () => {
    setMenuToggle(!menuToggle);
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
            key={`${biscuit[0]}_${resetToggle}`}
          >
            <div className="biscuit-container">
              <Disc
                className={biscuit[0].includes('y') ? 'yellow' : 'black'}
                biscuit={biscuit[0]}
              />
            </div>
          </Draggable>
        )}
        <Board />
        <Menu className={menuToggle ? 'is-open' : ''}>
          <Caret onClick={toggleMenu} />
          <Button onClick={resetBoard}>Reset Biscuits</Button>
          <Button onClick={toggleLines}>
            {linesEnabled ? 'Disable Lines' : 'Enable Lines'}
          </Button>
          <Button onClick={copyToClipboard} disabled={!copyUrlEnabled}>Copy Link to Clipboard</Button>
        </Menu>
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
  let str = `${window.location}?${biscuitCoordParams}`;

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
  border-left: 20px solid beige;
  border-right: 20px solid beige;

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

const Menu = styled.nav`
  background-color: rgba(245, 245, 220, 0.8);
  display: flex;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  flex-direction: column;
  padding: 0 20px 40px;
  position: absolute;
  bottom: 0;
  z-index: 1000;
  left: 0;
  right: 0;
  transform: translate3d(0, calc(100% - ${COLLAPSED_MENU_HEIGHT}px), 0);
  transition: transform 150ms ease-in-out;
  &.is-open {
    transform: translate3d(0, 0, 0);

    svg {
      transform: scaleY(1);
    }
  }

  & > div:first-child {
    height: ${COLLAPSED_MENU_HEIGHT}px;
  }
`;

const Button = styled.button`
  appearance: none;
  border: none;
  font-weight: 900;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  text-transform: uppercase;
  padding: 15px 20px;
  display: inline-block;
  background-color: ${lightSecondary};
  color: white;
  text-shadow: 0 0 5px black;
  transition: all 150ms ease;
  cursor: pointer;

  &:focus, &:active { outline: none; }

  &:not(:disabled) {
    &:hover {
      background-color: #ed2225;
    }
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:not(:last-of-type) {
    margin-bottom: 20px;
  }
`;
