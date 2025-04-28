export const generateRandomPoints = (count = 10, boardWidth, boardHeight) => {
  const points = [];
  const pointSize = 60;
  const halfSize = pointSize / 2;
  // const margin = 10;

  const ids = Array.from({ length: count }, (_, i) => i + 1);

  const shuffledIds = [...ids].sort(() => Math.random() - 0.5);

  for (const id of shuffledIds) {
    let x, y;
    let attempts = 0;
    let validPosition = false;

    do {
      x = Math.floor(Math.random() * (boardWidth - pointSize)) + halfSize;
      y = Math.floor(Math.random() * (boardHeight - pointSize)) + halfSize;
      attempts++;

      let overlap = false;
      for (const point of points) {
        const distance = Math.sqrt(
          Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2)
        );
        if (distance < pointSize * 0.8) {
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
      zIndex: id,
    });
  }

  return points.sort((a, b) => a.zIndex - b.zIndex);
};
