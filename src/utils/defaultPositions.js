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
    const yellowX =
      sizing.board / 2 -
      (BISCUIT_SIZE + sizing.board / 16.5) -
      (BISCUIT_SIZE * count + 5 * count);
    const blackX =
      sizing.board / 2 +
      (BISCUIT_SIZE + sizing.board / 16.5) +
      (BISCUIT_SIZE * (count - 1) + 5 * count);

    positions[color + (count + 1)] = {
      x: isYellow ? yellowX : blackX,
      y: window.innerHeight - (BISCUIT_SIZE + COLLAPSED_MENU_HEIGHT + 20),
    };
  }

  return positions;
};

export default defaultPositions;
