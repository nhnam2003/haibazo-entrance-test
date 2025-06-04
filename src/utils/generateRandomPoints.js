// utils/generateRandomPoints.js
export const generateRandomPoints = (count = 10, boardWidth, boardHeight) => {
  const points = [];
  const pointSize = 30;
  const halfSize = pointSize / 2;
  const margin = 10;

  const ids = Array.from({ length: count }, (_, i) => i + 1);

  const shuffledIds = [...ids].sort(() => Math.random() - 0.5);

  for (const id of shuffledIds) {
    let x, y;
    let attempts = 0;
    let validPosition = false;

    do {
      x = Math.floor(
        margin + Math.random() * (boardWidth - pointSize - 2 * margin)
      ) + halfSize;
      y = Math.floor(
        margin + Math.random() * (boardHeight - pointSize - 2 * margin)
      ) + halfSize;
      attempts++;

      let overlap = false;
      for (const point of points) {
        const distance = Math.sqrt(
          Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2)
        );
        if (distance < pointSize) {
          overlap = true;
          break;
        }
      }

      validPosition = attempts > 20 ? true : !overlap;
    } while (!validPosition && attempts < 50);

    points.push({
      id,
      x,
      y,
      size: pointSize,
      zIndex: count - id + 1
    });
  }

  return points;
};
