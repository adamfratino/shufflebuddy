import styled from 'styled-components';
import { BISCUIT_SIZE } from '../variables';

export const BiscuitContainer = styled.div`
  z-index: 10;
  position: absolute;
  & > span {
    height: ${BISCUIT_SIZE}px;
    width: ${BISCUIT_SIZE}px;
  }
  &.react-draggable-dragging > span {
    transform: scale(1.3);
  }
  &.is-disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`;
