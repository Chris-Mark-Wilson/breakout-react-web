export const getNewCoords = (speed, ballCoords) => {
  let { x, y, direction } = ballCoords;

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

  //return new ball coords and direction
  return { x, y, direction };
}; //end function
