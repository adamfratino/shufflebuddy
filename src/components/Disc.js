import React, { forwardRef } from 'react';
import styled from 'styled-components';

// Biscuits are 6" in diameter
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
  box-shadow: 0 0 6px 0px black inset;
  transition: all 100ms ease-in-out;
  position: relative;

  &.yellow {
    background: #fdd835;
  }
  &.black {
    background: #444;
  }

  & > span {
    pointer-events: none;
    height: 60%;
    width: 60%;
    border-radius: 50%;
    box-shadow: 0 0 11px -1px black inset;
  }
`;
