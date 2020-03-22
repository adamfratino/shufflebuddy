import defaultPositions from './defaultPositions';

const loadPositions = params => {
  const defaultPos = defaultPositions();

  return {
    y1: {
      x: params.has('y1') ? +params.get('y1').split('-')[0] : defaultPos.y1.x,
      y: params.has('y1') ? +params.get('y1').split('-')[1] : defaultPos.y1.y,
    },
    y2: {
      x: params.has('y2') ? +params.get('y2').split('-')[0] : defaultPos.y2.x,
      y: params.has('y2') ? +params.get('y2').split('-')[1] : defaultPos.y2.y,
    },
    y3: {
      x: params.has('y3') ? +params.get('y3').split('-')[0] : defaultPos.y3.x,
      y: params.has('y3') ? +params.get('y3').split('-')[1] : defaultPos.y3.y,
    },
    y4: {
      x: params.has('y4') ? +params.get('y4').split('-')[0] : defaultPos.y4.x,
      y: params.has('y4') ? +params.get('y4').split('-')[1] : defaultPos.y4.y,
    },
    b1: {
      x: params.has('b1') ? +params.get('b1').split('-')[0] : defaultPos.b1.x,
      y: params.has('b1') ? +params.get('b1').split('-')[1] : defaultPos.b1.y,
    },
    b2: {
      x: params.has('b2') ? +params.get('b2').split('-')[0] : defaultPos.b2.x,
      y: params.has('b2') ? +params.get('b2').split('-')[1] : defaultPos.b2.y,
    },
    b3: {
      x: params.has('b3') ? +params.get('b3').split('-')[0] : defaultPos.b3.x,
      y: params.has('b3') ? +params.get('b3').split('-')[1] : defaultPos.b3.y,
    },
    b4: {
      x: params.has('b4') ? +params.get('b4').split('-')[0] : defaultPos.b4.x,
      y: params.has('b4') ? +params.get('b4').split('-')[1] : defaultPos.b4.y,
    },
  };
};

export default loadPositions;
