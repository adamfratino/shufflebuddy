import styled from 'styled-components';
import { lightPrimary, BOARD_MAX_WIDTH } from '../variables';

export const Court = styled.div`
  position: relative;
  background: ${lightPrimary};
  width: 100%;
  height: 100vh;
  max-width: ${BOARD_MAX_WIDTH}px;

  @media (max-width: ${BOARD_MAX_WIDTH}px) {
    border: none;
  }
`;
