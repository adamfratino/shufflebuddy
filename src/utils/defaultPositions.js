import { BOARD_WIDTH, BISCUIT_SIZE, COLLAPSED_MENU_HEIGHT } from '../variables';

const defaultPositions = () => {
  const positions = {};
  const containerWidth = BOARD_WIDTH;

  for (let i = 0; i < 8; i++) {
    const isYellow = i < 4;
    const color = isYellow ? 'y' : 'b';
    const count = i % 4;
    const yellowX = BISCUIT_SIZE * count + (10 + 5 * count);
    const blackX = containerWidth - BISCUIT_SIZE * count - 5 * count;

    positions[color + (count + 1)] = {
      x: isYellow ? yellowX : blackX,
      y: window.innerHeight - (BISCUIT_SIZE + COLLAPSED_MENU_HEIGHT + 10),
    };
  }

  return positions;
};

export default defaultPositions;
