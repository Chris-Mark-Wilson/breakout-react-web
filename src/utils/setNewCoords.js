import { checkBat } from "./checkBat";
import { checkBricks } from "./checkBricks";
export const setNewCoords = (
    ballCoords,
    setBallCoords,
    scrWidth,
    scrHeight,
    bat,
    setGameOver,
    brickArray,
    setBrickArray) => {
    let { x, y, direction } = ballCoords;
  const speed = ((204 - brickArray.length) / 10) + 8;
  console.log(speed)
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
     const hitBrick=checkBricks(brickArray,ballCoords)

      if(hitBrick){
      
        //hit brick, remove from array
        setBrickArray(oldbrickArray=>{
          const newBrickArray = oldbrickArray.filter(brick => brick.id !== hitBrick)
          //not sure why yet but can never get the 1st brick in the array, index 0, brick.id===0??
       
          return newBrickArray
        })
        //now check how the wall is rendered... theyve all got unique id's so???

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
      
      }
//else if top of screen rebound..
  if(y<=0){
      if (direction < 360 && direction > 270) {
        direction = 270 - (direction - 270);
      } else if (direction > 0 && direction < 90) {
        direction = 90 + (90 - direction);
      }
      else if(direction===0){direction=180}
    }
  }
    /////////////////////////////bottom of screen///////////////////////////////
  //calculate Y positions of edges of bat
  const batYLeft = bat.y - (Math.sin((bat.angle * 3.14) / 180) * bat.width/2)
  const batYRight=bat.y+ (Math.sin((bat.angle * 3.14) / 180) * bat.width/2)
  //calculate X positions of edges of bat
  const batXLeft = bat.x - (Math.cos((bat.angle * 3.14) / 180) * bat.width/2) 
  const batXRight = bat.x + (Math.cos((bat.angle * 3.14) / 180) * bat.width/2)

  const highCorner = Math.min(batYLeft, batYRight) 
  
  const lowCorner = Math.max(batYLeft, batYRight)

  if (y >= highCorner) {

    if (x > batXLeft && x < batXRight) {
      //within bat width
 
      if (checkBat(batXLeft, batYLeft, batXRight, batYRight, x, y)) {
       //hit bat
    
        if (direction > 180) {
          if (bat.angle < 0) {
            direction = (360 - (direction - 180)) - Math.abs(bat.angle)
            y -= speed;
          } else if (bat.angle > 0) {
            direction = (360 - (direction - 180)) + bat.angle
            y -= speed;
          } else if (bat.angle === 0) {
            direction = 360 - (direction - 180)
            y -= speed;
          }
        } else if (direction < 180) {
          if (bat.angle <= 0) {
            direction = 180 - direction - Math.abs(bat.angle)
            y -= speed;
          } else if (bat.angle > 0) {
            direction = 180 - direction + bat.angle
            y -= speed;
          }
        } else if (direction === 180) {
          direction = 0
          y -= speed;
        }
      }
  
      if (direction < 0) direction = 360 - direction
      if (direction > 360) direction = direction - 360
    }
     
  }
  if (y >= lowCorner+20) {
    console.log("stop")
      // placeholder for game over/ dropped ball
      setBallCoords(coords=>{
        const newCoords={...coords}
       newCoords.x=bat.x
       newCoords.y=bat.y-10
       newCoords.direction=45
      return newCoords
    })
      setGameOver(true)
      return ({ x, y, direction });
    }
 
 //return new ball coords and direction
 return({ x, y, direction });
}; //end function

  