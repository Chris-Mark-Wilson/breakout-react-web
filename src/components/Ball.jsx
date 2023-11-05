


import { useState, useEffect, useContext } from "react";
import { setNewCoords } from "../utils/setNewCoords";
import { GameContext } from "../contexts/gameContext";

export const Ball = () => {
  const { batProps, windowWidth, windowHeight, gameOver } = useContext(
    GameContext
  )
  const [ballCoords, setBallCoords] = useState({
    x: 0,
    y: 0,
    direction: 45,
  });

  //initial setup
  useEffect(() => {
    const startY = windowHeight - 60;
    const startX = windowWidth / 2;
    setBallCoords((coords) => {
      const newCoords = { ...coords };
      newCoords.x = startX;
      newCoords.y = startY;
      return newCoords;
    });
  }, []);
  //end initial setup

  useEffect(() => {
    if (!gameOver) {
      setTimeout(() => {
        setNewCoords(
          ballCoords,
          setBallCoords,
          windowWidth,

          batProps
        );
      }, 10);
    }
  }, [gameOver, ballCoords]);

  return (
    <div
      style={{
        width: 10,
        height: 10,
        backgroundColor: "black",
        position: "absolute",
        top: ballCoords.y,
        left: ballCoords.x,
      }}
    ></div>
  );
};
