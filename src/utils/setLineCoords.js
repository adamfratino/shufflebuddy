import { BISCUIT_SIZE } from '../variables';

const setLineCoords = (line, x, y) => {
  line.querySelector('line').setAttribute('x2', x + BISCUIT_SIZE / 2);
  line.querySelector('line').setAttribute('y2', y + BISCUIT_SIZE / 2);
};
export default setLineCoords;
