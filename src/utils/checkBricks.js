export function checkBricks(brickArray, ballCoords) {
    console.log("checking bricks",brickArray,ballCoords)
  for (let i = 0; i < brickArray.length; i++) {
    const brick = brickArray[i];
    if (
      ballCoords.x +7>= brick.left &&
      ballCoords.x -7<= brick.left + brick.width &&
      ballCoords.y +7>= brick.top &&
      ballCoords.y -7<= brick.top + brick.height
    ) {
      return i;
    }
  }
  return false;
}
