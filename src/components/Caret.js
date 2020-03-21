import React from 'react';
import styled from 'styled-components';

const Caret = ({onClick}) => (
  <CaretContainer onClick={onClick}>
    <svg viewBox="0 0 26 19">
      <path d="M13 12.49l-8-8M21 4.49l-8.35 8.35" stroke="black" strokeWidth="2px"></path>
    </svg>
  </CaretContainer>
);

export default Caret;

const CaretContainer = styled.div`
display: flex;
justify-content: center;
align-items: flex-start;
padding-top: 10px;
height: 60px;
overflow: hidden;
cursor: pointer;

  svg {
    transition: transform 150ms ease-in-out;
    transform: scaleY(-1);
    width: 40px;
  }
`;
