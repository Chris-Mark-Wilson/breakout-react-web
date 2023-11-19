export const checkBat = (x, y, bat) => {
 
  //calculate Y positions of edges of bat
  const batYLeft = bat.y - (Math.sin((bat.angle * 3.14) / 180) * bat.width) / 2;
  const batYRight = bat.y + (Math.sin((bat.angle * 3.14) / 180) * bat.width) / 2;
  //calculate X positions of edges of bat
  const batXLeft = bat.x - (Math.cos((bat.angle * 3.14) / 180) * bat.width) / 2;
  const batXRight = bat.x + (Math.cos((bat.angle * 3.14) / 180) * bat.width) / 2;
//find high an low corners of bat
  const highCorner = Math.min(batYLeft, batYRight) 
  const lowCorner = Math.max(batYLeft, batYRight)

  if(y>=highCorner&&x>batXLeft&&x<batXRight){

  // Check if the point (ballx, bally) is on the line defined by (leftx, lefty) and (rightx, righty)

  // Calculate the slope of the line
  const slope = (batYRight - batYLeft) / (batXRight - batXLeft);

  // Calculate the expected y-coordinate on the line for the given ballx
  const expectedY = slope * (x - batXLeft) + batYLeft;

  // Check if the calculated y-coordinate matches the actual bally

  return y > expectedY;
    //the -2 is a bt of a fudge factor to account for the ball moving faster than the bat
  }
  return false;
};
