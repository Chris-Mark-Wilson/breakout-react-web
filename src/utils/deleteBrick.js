export const deleteBrick = (setBrickArray, hitBrick,direction) => {   
     //hit brick, remove from array
     setBrickArray(oldbrickArray=>{
        const newBrickArray = oldbrickArray.filter(brick => brick.id !== hitBrick)
        //not sure why yet but can never get the 1st brick in the array, index 0, brick.id===0??
     
        return newBrickArray
      })
    

      //bounce back, off the brick
      if (direction < 90) {
        direction = 90 + (90 - direction)
      } else if (direction > 90 && direction < 180) {
        direction = 90 - (direction - 90);
      } else if (direction > 270 && direction < 360) {
        direction = 270 - (direction - 270)
      } else if (direction > 180 && direction < 270) {
        direction = 270 + (270 - direction)
      } else if (direction === 90) {
        direction = 270;
      } else if (direction === 270) {
        direction = 90
      } else if (direction === 180) {
        direction = 0
      } else if (direction === 360) {
        direction = 180
      }
    return (direction )
    }    