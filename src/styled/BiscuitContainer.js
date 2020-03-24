import styled from 'styled-components';
import { BISCUIT_SIZE } from '../variables';

const DRAG_SHADOW_SIZE = 50;

export const BiscuitContainer = styled.div`
  z-index: 10;
  position: absolute;
  &::before {
    opacity: 0;
    content: '';
  }

  & > span {
    height: ${BISCUIT_SIZE}px;
    width: ${BISCUIT_SIZE}px;
  }

  &.react-draggable-dragging {
    &::before {
      content: '';
      position: absolute;
      background-color: rgba(0, 0, 0, 0.25);
      border-radius: 50%;
      height: calc(100% + ${DRAG_SHADOW_SIZE}px);
      width: calc(100% + ${DRAG_SHADOW_SIZE}px);
      transform: translate3d(-${DRAG_SHADOW_SIZE / 2}px, -${DRAG_SHADOW_SIZE / 2}px, 0);
      opacity: 1;
    }

    & > span {
      transform: scale;
    }
  }
  &.is-disabled {
    pointer-events: none;
    & > span {
      background-color: rgba(0, 0, 0, 0.75) !important;
    }
  }
`;
