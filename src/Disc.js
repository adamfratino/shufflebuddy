import React from 'react';
import styled from 'styled-components';

const Disc = (props) => (
  <StyledDisc className={props.className}>
    <span />
  </StyledDisc>
);

export default Disc;

const StyledDisc = styled.span`
  cursor: move;
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 4px 0px black inset;

  @media (min-width: 767px) {
    width: 50px;
    height: 50px;
  };

  &.yellow { background: gold; }
  &.black { background: #444; }

  & > span {
    pointer-events: none;
    height: 70%;
    width: 70%;
    border-radius: 50%;
    box-shadow: 0 0 7px 0 black inset;
  }
`;
