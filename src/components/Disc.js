import React, { forwardRef } from 'react';
import styled from 'styled-components';

const Disc = forwardRef((props, ref) => (
  <StyledDisc className={props.className} data-biscuit={props.biscuit} ref={ref}>
    <span />
  </StyledDisc>
));

export default Disc;

const StyledDisc = styled.span`
  cursor: move;
  display: block;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 4px 0px black inset;
  transition: transform 100ms ease-in-out;

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
