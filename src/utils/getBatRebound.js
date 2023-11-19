export const getBatRebound = (x, y, angle, direction,speed) => {
    if (direction > 180) {
        if (angle < 0) {
            direction = (360 - (direction - 180)) - Math.abs(angle)
            y -= speed;
        } else if (angle > 0) {
            direction = (360 - (direction - 180)) + angle
            y -= speed;
        } else if (angle === 0) {
            direction = 360 - (direction - 180)
            y -= speed;
        }
    } else if (direction < 180) {
        if (angle < 0) {
            direction = (180 - direction) - Math.abs(angle)
            if (direction < 0) { direction = 360 + direction }
            y -= speed;
        } else if (angle > 0) {
            direction = (180 - direction) + angle
            y -= speed;
        }
        else if (angle === 0) {
            direction = 180 - direction
            y -= speed;
        }
    } else if (direction === 180) {
        direction = 0
        y -= speed;
    }
    return ({ x, y, direction });
}