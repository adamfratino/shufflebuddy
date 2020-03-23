import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { lightSecondary } from '../variables';

const LinesCanvas = forwardRef((props, ref) => (
  <StyledLinesCanvas className={props.className} ref={ref} />
));

export default LinesCanvas;

const StyledLinesCanvas = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 5;
  transition: background-color 150ms ease;

  &.is-disabled {
    background-color: rgba(0, 0, 0, 0.5);

    line {
      stroke: black;
    }

    circle {
      fill: black !important;
    }
  }

  svg {
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    transition: all 150ms ease;

    line {
      stroke: ${lightSecondary};
    }

    circle {
      opacity: 0.5;
      &.yellow {
        fill: yellow;
      }
      &.black {
        fill: black;
      }
    }
  }
`;
