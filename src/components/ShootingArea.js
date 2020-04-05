import React from 'react';
import styled from 'styled-components';

const ShootingArea = (isEnabled) => (
  <SVGContainer className={isEnabled.isEnabled ? 'is-enabled' : ''}>
    <svg
      x="0px"
      y="0px"
      viewBox="0 0 72 126"
      preserveAspectRatio="xMidYMax meet"
      className="other-board"
    >
      <polygon className="box" points="-0.46,125.4 71.54,125.4 66,107.4 6,107.4 " />
      <polygon
        className="triangle"
        points="33.97,125.4 37.98,125.4 36.1,107.41 35.87,107.38 "
      />
    </svg>
  </SVGContainer>
);

export default ShootingArea;

const SVGContainer = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  height: calc(100vh - 70px);
  position: absolute;
  left: 0;
  right: 0;
  bottom: 40px;
  z-index: 1;
  opacity: 0;
  transition: opacity 150ms ease;
  &.is-enabled {
    opacity: 1;
  }

  svg {
    max-height: 100%;
    width: 100%;
    overflow: visible;
    fill: transparent;
  }

  .box {
    stroke: rgba(0, 0, 0, 0.75);
    fill: rgba(0, 0, 0, 0.25);
  }

  .triangle {
    fill: rgba(0, 0, 0, 0.75);
    stroke: none;
  }
`;
