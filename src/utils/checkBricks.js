export function checkBricks(brickArray, x, y, windowHeight) {
  if (y <= (windowHeight / 40) * 10) {

    for (let i = 0; i < brickArray.length; i++) {
      const brick = brickArray[i];
      if (
        x >= brick.left &&
        x <= brick.left + brick.width &&
        y >= brick.top &&
        y <= brick.top + brick.height
      ) {
        return brick.id;
      }
    }
  }
  return false;
}
