import { checkBat } from "./checkBat";

export const setNewCoords = (
    ballCoords,
    setBallCoords,
    scrWidth,
    scrHeight,
    bat,
    setGameOver) => {
    let { x, y, direction } = ballCoords;
    const speed = 2;
    let xv = 0;
    let yv = 0;
  
    // calculate new position based on direction
 

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
      else if(direction===0){direction=180}
    }
    /////////////////////////////bottom of screen///////////////////////////////
  //calculate Y positions of edges of bat
  const batYLeft = bat.y - (Math.sin((bat.angle * 3.14) / 180) * bat.width/2)
  const batYRight=bat.y+ (Math.sin((bat.angle * 3.14) / 180) * bat.width/2)
  //calculate X positions of edges of bat
  const batXLeft = bat.x - (Math.cos((bat.angle * 3.14) / 180) * bat.width/2) 
  const batXRight = bat.x + (Math.cos((bat.angle * 3.14) / 180) * bat.width/2)

  
  if ((y >= batYLeft && y <= batYRight) || (y >= batYRight && y <= batYLeft) || (y >= batYLeft && y <= batYLeft + 5 && bat.angle === 0)) {
    // console.log(checkBat(batXLeft,batYLeft,batXRight,batYRight,x,y))
    // below bat top edge, above bat bottom edge
    // console.log("\\\\\\\\\\\\\\\\\\\\\\\\")
    // console.log("bat.x is centre of bat")
    // console.log(batYLeft, "bat Y", batYRight)
    //   console.log(batXLeft, "bat X", batXRight)
    //   console.log("actual batLeft coords", bat.x-(bat.width/2), bat.y)
    //   console.log("ball coords", x, y)
    //   console.log("bat angle", bat.angle)
    //   console.log("newWidth", batXRight - batXLeft)
    //   console.log("actualWidth", bat.width)
    //   console.log("batYleft-batYright", batYLeft - batYRight)
      console.log("hit bat Y")
    console.log("\\\\\\\\\\\\\\\\\\\\\\\\")
    // if (x > batXLeft && x < batXRight) {
      if  (checkBat(batXLeft,batYLeft,batXRight,batYRight,x,y)){
      //within bat width
      console.log("hit bat X")
      console.log("direction before", direction)
      if (direction > 180) {
        if (bat.angle < 0) {
          direction=(360-(direction-180))-Math.abs(bat.angle)
        }else if(bat.angle>0){
          direction=(360-(direction-180))+bat.angle
        }else if(bat.angle===0){
          direction=360-(direction-180)
        }
      } else if (direction < 180) {
        if (bat.angle <= 0) {
         direction=180-direction-Math.abs(bat.angle)
        }else if(bat.angle>0){
          direction=180-direction+bat.angle
        }
      } else if (direction === 180) {
  direction=0
      }
      console.log("direction after", direction) 
}
     
  } else if (y >= batYLeft && y >= batYRight) {
    console.log("stop")
      // placeholder for game over
      setBallCoords(coords=>{
        const newCoords={...coords}
       newCoords.x=bat.x+bat.width/2
       newCoords.y=bat.y-10
       newCoords.direction=45
      return newCoords
    })
      setGameOver(true)
      return
    }
 
 
  setBallCoords({ x, y, direction });
}; //end function

  