import styled from 'styled-components';
import { lightPrimary } from '../variables';

export const Court = styled.div`
  position: relative;
  background: ${lightPrimary};
  width: 100%;
  height: 100vh;
  max-width: 600px;

  @media (max-width: 620px) {
    border: none;
  }
`;
