import React from 'react';
import styled from 'styled-components';
import { COLLAPSED_MENU_HEIGHT } from '../variables';
const Board = () => (
  <BoardContainer>
    <svg
      id="board"
      x="0px"
      y="0px"
      viewBox="0 0 72 126"
      preserveAspectRatio="xMidYMin meet"
    >
      <g className="board-frame">
        <polygon points="0,0 72,0 66,18 6,18 " className="frame" />
        <polyline points="6,18 0,18 36,125 72,18 66,18 " className="frame" />
        <line x1="24" y1="90" x2="48" y2="90" className="frame" />
        <line x1="24" y1="90" x2="47" y2="90" className="frame" />
        <line x1="27" y1="90" x2="48" y2="90" className="frame" />
        <line x1="36" y1="18" x2="36" y2="90" className="frame" />
        <line x1="12" y1="54" x2="60" y2="54" className="frame" />
        <polygon points="34.43,0 37.52,0 36,18 " className="kitchen-triangle" />
        <circle cx="50" cy="50" r="3" className="invisible-biscuit" stroke="black" />
      </g>
    </svg>
  </BoardContainer>
);

export default Board;

const BoardContainer = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  height: calc(100vh - ${COLLAPSED_MENU_HEIGHT + 20}px);
  position: absolute;
  left: 0;
  right: 0;

  svg {
    max-height: 100%;
    width: 100%;
    overflow: visible;
    fill: transparent;

    .frame {
      stroke: black;
      stroke-width: 1.25px;
    }

    .kitchen-triangle {
      fill: black;
    }
  }
`;
