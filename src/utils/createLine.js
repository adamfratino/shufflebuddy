import { BISCUIT_SIZE } from '../variables';

const createLine = (ref, name, color, x, y) => {
  const biscuitLine = document.querySelector(`.${name}`);

  if (biscuitLine) {
    biscuitLine.remove();
  }

  ref.innerHTML += `
    <svg class="${name}">
      <circle
        r="${BISCUIT_SIZE / 2}"
        cx="${x + BISCUIT_SIZE / 2}"
        cy="${y + BISCUIT_SIZE / 2}"
        class="${color}"
      />
      <line
        stroke-width="3px"
        stroke-dasharray="5px"
        x1="${x + BISCUIT_SIZE / 2}"
        y1="${y + BISCUIT_SIZE / 2}"
        x2="${x + BISCUIT_SIZE / 2}"
        y2="${y + BISCUIT_SIZE / 2}"
      />
    </svg>
  `;
};

export default createLine;
