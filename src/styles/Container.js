import styled from 'styled-components';
import { BOARD_MAX_WIDTH } from '../variables';

export const Container = styled.main`
  overflow: hidden;
  box-shadow: 0 0 60px -10px black;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  justify-content: center;
  width: ${BOARD_MAX_WIDTH}px;
  max-width: 100vw;
`;
