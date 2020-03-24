import {
  BOARD_WIDTH,
  BOARD_MAX_WIDTH,
  BISCUIT_SIZE,
  COLLAPSED_MENU_HEIGHT,
} from '../variables';

let sizing = {
  board: window.innerWidth,
  gutter: 10,
};

if (window.innerWidth > BOARD_MAX_WIDTH) {
  sizing.board = document.querySelector('#board').getBoundingClientRect().width + 20;
  sizing.gutter = window.innerWidth > 650 ? (sizing.board - BOARD_WIDTH) / 2 : 10;
}

const defaultPositions = () => {
  const positions = {};

  for (let i = 0; i < 8; i++) {
    const isYellow = i < 4;
    const color = isYellow ? 'y' : 'b';
    const count = i % 4;
    const yellowX = sizing.gutter + BISCUIT_SIZE * count + 5 * count;
    const blackX = sizing.board - BISCUIT_SIZE * (count + 1) - sizing.gutter - count * 5;

    positions[color + (count + 1)] = {
      x: isYellow ? yellowX : blackX,
      y: window.innerHeight - (BISCUIT_SIZE + COLLAPSED_MENU_HEIGHT + 10),
    };
  }

  return positions;
};

export default defaultPositions;
