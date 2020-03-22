import styled from 'styled-components';
import { COLLAPSED_MENU_HEIGHT, BOARD_MAX_WIDTH } from '../variables';

export const Menu = styled.nav`
  background-color: rgba(245, 245, 220, 0.95);
  display: flex;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  flex-direction: column;
  padding: 0 20px 40px;
  z-index: 1000;
  transform: translate3d(0, calc(100% - ${COLLAPSED_MENU_HEIGHT}px), 0);
  transition: all 150ms ease;
  position: fixed;
  width: 100vw;
  max-width: ${BOARD_MAX_WIDTH}px;
  bottom: 0;
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
