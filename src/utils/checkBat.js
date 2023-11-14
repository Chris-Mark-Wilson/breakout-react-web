export const checkBat=(leftx, lefty, rightx, righty, ballx, bally) => {
    // Check if the point (ballx, bally) is on the line defined by (leftx, lefty) and (rightx, righty)
    
    // Calculate the slope of the line
    const slope = (righty - lefty) / (rightx - leftx);
  
    // Calculate the expected y-coordinate on the line for the given ballx
    const expectedY = slope * (ballx - leftx) + lefty;
  
    // Check if the calculated y-coordinate matches the actual bally
    console.log(expectedY,bally)
   
  return bally > expectedY - 2
  //the -2 is a bt of a fudge factor to account for the ball moving faster than the bat
}