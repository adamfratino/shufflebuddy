import React from 'react';
import Draggable from 'react-draggable';
import { darkPrimary, lightPrimary } from './colors';
import Board from './Board';
import Disc from './Disc';
import styled from 'styled-components';

const App = () => {
  const handleStart = e => e.target.classList.add('is-dragging');
  const handleStop = e => e.target.classList.remove('is-dragging');

  return (
    <Container>
      <Court>
        <Draggable bounds="parent" onStart={handleStart} onStop={handleStop}>
          <div><Disc className="yellow" /></div>
        </Draggable>
        <Draggable bounds="parent" onStart={handleStart} onStop={handleStop}>
          <div><Disc className="yellow" /></div>
        </Draggable>
        <Draggable bounds="parent" onStart={handleStart} onStop={handleStop}>
          <div><Disc className="yellow" /></div>
        </Draggable>
        <Draggable bounds="parent" onStart={handleStart} onStop={handleStop}>
          <div><Disc className="yellow" /></div>
        </Draggable>
        <Draggable bounds="parent" onStart={handleStart} onStop={handleStop}>
          <div><Disc className="black" /></div>
        </Draggable>
        <Draggable bounds="parent" onStart={handleStart} onStop={handleStop}>
          <div><Disc className="black" /></div>
        </Draggable>
        <Draggable bounds="parent" onStart={handleStart} onStop={handleStop}>
          <div><Disc className="black" /></div>
        </Draggable>
        <Draggable bounds="parent" onStart={handleStart} onStop={handleStop}>
          <div><Disc className="black" /></div>
        </Draggable>
        <Board />
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

  @media (max-width: 767px) {
    border: none;
  };

  & > div {
    position: absolute;
    left: 10px;
    &:nth-of-type(4n+1) { bottom: 190px; }
    &:nth-of-type(4n+2) { bottom: 130px; }
    &:nth-of-type(4n+3) { bottom: 70px; }
    &:nth-of-type(4n+4) { bottom: 10px; }
    &:nth-of-type(n+5) { left: auto; right: 10px; }

    span {
      transition: transform 100ms ease-in-out;
      &.is-dragging { transform: scale(2.5); }
    }
  }
`;
