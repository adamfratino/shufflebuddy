import { BOARD_MAX_WIDTH, BISCUIT_SIZE, COLLAPSED_MENU_HEIGHT } from './variables';

export const widthDetection = () => {
  if (window.innerWidth > BOARD_MAX_WIDTH) {
    return BOARD_MAX_WIDTH - 60;
  } else {
    return window.innerWidth - (BISCUIT_SIZE + 10);
  }
};

export const copyToClipboard = params => {
  let str = `${window.location}?${params}`;

  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

export const defaultPositions = () => {
  const positions = {};
  const containerWidth = widthDetection();

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

export const removeLines = el => (el.innerHTML = '');
