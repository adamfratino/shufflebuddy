import styled from 'styled-components';

export const LinesCanvas = styled.div`
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
  }

  svg {
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;

    circle {
      opacity: 0.5;
    }
  }
`;
