export function checkBricks(brickArray, ballCoords) {
   
  for (let i = 0; i < brickArray.length; i++) {
    const brick = brickArray[i];
    if (
      ballCoords.x +2>= brick.left &&
      ballCoords.x -2<= brick.left + brick.width &&
      ballCoords.y +2>= brick.top &&
      ballCoords.y -2<= brick.top + brick.height
    ) {
      return i;
    }
  }
  return false;
}
