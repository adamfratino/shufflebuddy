const invisibleBiscuit = document.querySelector('.invisible-biscuit');
const boardFrame = document.querySelector('.board-frame');

export const lightPrimary = `#8cdbd6`;
export const darkPrimary = `#4a8c88`;
export const lightSecondary = `#f03f41`;

export const COLLAPSED_MENU_HEIGHT = 50;
export const BOARD_MAX_WIDTH = 650;
export const BOARD_WIDTH = boardFrame.getBoundingClientRect().width;
export const BISCUIT_SIZE = invisibleBiscuit.getBoundingClientRect().width;
