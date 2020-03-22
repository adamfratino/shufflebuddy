import styled from 'styled-components';
import { lightSecondary } from '../variables';

export const Button = styled.button`
  appearance: none;
  font-family: 'Futura';
  border: none;
  font-weight: 900;
  font-size: 14px;
  letter-spacing: 1px;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  text-transform: uppercase;
  padding: 15px 20px;
  display: inline-block;
  background-color: ${lightSecondary};
  color: white;
  text-shadow: 0 0 5px black;
  transition: all 150ms ease;
  cursor: pointer;

  &:focus,
  &:active {
    outline: none;
  }

  &:not(:disabled) {
    &:hover {
      background-color: #ed2225;
    }
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:not(:last-of-type) {
    margin-bottom: 20px;
  }
`;
