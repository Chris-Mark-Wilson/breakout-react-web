


import { useState, useEffect, useContext } from "react";
import { setNewCoords } from "../utils/setNewCoords";
import { GameContext } from "../contexts/gameContext";

export const Ball = () => {
  const { ballCoords} = useContext(
    GameContext
  )
 

 
  //end initial setup



  return (
    <div
      style={{
        width: 10,
        height: 10,
        backgroundColor: "black",
        position: "absolute",
        top: ballCoords.y,
        left: ballCoords.x,
        borderRadius:"50%"
      }}
    ></div>
  );
};
