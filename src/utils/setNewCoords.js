

export const setNewCoords = (
    ballCoords,
    setBallCoords,
    scrWidth,
    scrHeight,
    bat) => {
    let { x, y, direction } = ballCoords;
    const speed = 5;
    let xv = 0;
    let yv = 0;
  
    // calculate new position based on direction
  ///////sort this lot out its bouncing at 90 all the time

    if (direction > 0 && direction < 90) {
      xv = Math.sin((direction * 3.14) / 180);
      yv = Math.cos((direction * 3.14) / 180);
      x += xv * speed;
      y -= yv * speed;
  
    } else if (direction > 90 && direction < 180) {
      xv = Math.cos(((direction - 90) * 3.14) / 180);
      yv = Math.sin(((direction - 90) * 3.14) / 180);
      x += xv * speed;
      y += yv * speed;
  
    } else if (direction > 180 && direction < 270) {
      xv = Math.sin(((direction - 180) * 3.14) / 180);
      yv = Math.cos(((direction - 180) * 3.14) / 180);
      x -= xv * speed;
      y += yv * speed;
  
    } else if (direction > 270 && direction < 360) {
      xv = Math.cos(((direction - 270) * 3.14) / 180);
      yv = Math.sin(((direction - 270) * 3.14) / 180);
   
      x -= xv * speed;
      y -= yv * speed;
    }
  
    if (direction === 90) {
      x += 1 * speed;
    }
    if (direction === 180) {
      y += 1 * speed;
    }
    if (direction === 270) {
      x -= 1 * speed;
    }
    if (direction === 360 || direction === 0) {
      y -= 1 * speed;
    }
  
    //got new position, check borders
    if (x >= scrWidth - 20) {
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
  
    if (y <= (scrHeight/40)*10) {
      //check bricks
  
      if (direction < 360 && direction > 270) {
        direction = 270 - (direction - 270);
      } else if (direction > 0 && direction < 90) {
        direction = 90 + (90 - direction);
      }
    }
  /////////////////////////////bottom of screen///////////////////////////////
  
    if (y >= bat.y - 10) {
      // below baseline
  
      if (x > bat.x && x < bat.x + bat.width) {
        //hit the bat
        if (x <= bat.x + bat.width / 2) {
          //left hand side
          console.log("hit left at " + direction);
  
          let angleOfIncidence;
          if (direction > 180) {
            angleOfIncidence = 270 - direction;
          } else if (direction < 180) {
            angleOfIncidence = 90 - (direction-90);
          } else angleOfIncidence = 0;
  
          //ok so far...
  
          let impactPoint = (x - bat.x) / (bat.width / 2 + bat.x - bat.x);
  
          //ok again...
  
          //this bits now right..
          console.log(impactPoint)
          direction = 270 + (impactPoint * angleOfIncidence);
        }
        if (x >= bat.x + bat.width / 2) {
          //right hand side
  console.log("hit right at " + direction)
          let angleOfIncidence;
          if (direction > 180) {
            angleOfIncidence = 270 - direction;
          } else if (direction < 180) {
            angleOfIncidence = 90 - (direction-90);
          } else angleOfIncidence = 0;
  
          //ok so far...
  
          let impactPoint =
            (x - (bat.x + bat.width / 2)) /
            (bat.width + bat.x - (bat.x + bat.width / 2));
  console.log(impactPoint)
  //this is wrong
          direction = 90 - ((1-impactPoint) * angleOfIncidence);
        }
      }
    }
    console.log(direction)
    setBallCoords({ x, y, direction });
  }; //end function
  
  