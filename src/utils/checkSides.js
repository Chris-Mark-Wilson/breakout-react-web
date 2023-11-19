export const checkSides = (x, y, direction,windowWidth) => {
    

    if (x >= windowWidth - 20) {
        // hit rh side
    
        if (direction < 90) {
          direction = 360 - direction;
        } else if (direction > 90&&direction<180) {
          direction = 270 - (direction - 90);
        } else if (direction === 90) {
          direction = 270;
        }
      }
    
      if (x <= 0) {
        //hit lh side
    
        if (direction > 270) {
          direction = 360 - direction;
        } else if (direction < 270 && direction > 180) {
          direction = 180 - (direction - 180);
        } else if (direction === 270) {
          direction = 90;
        }
      }
      if(y<=0){
        if (direction < 360 && direction > 270) {
          direction = 270 - (direction - 270);
        } else if (direction > 0 && direction < 90) {
          direction = 90 + (90 - direction);
        }
        else if(direction===0){direction=180}
      }


    return ({ x, y, direction })
}