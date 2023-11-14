
import { Wall } from "../components/Wall";
import { Ball } from "../components/Ball";
import { Bat } from "../components/Bat";
import { GameContext } from "../contexts/gameContext";
import { useContext, useState } from "react";
import { useRef, useEffect } from "react";
import { setNewCoords } from "../utils/setNewCoords";

export const GameScreen = () => {
    const inputRef = useRef(null)
   
   
 
    const {
        gameOver, setGameOver,batProps,setBatProps,windowHeight,windowWidth,ballCoords,setBallCoords
    } = useContext(GameContext);


    useEffect ( () => {
        inputRef.current.focus();
        window.addEventListener("keydown", (e) => {
            if (e.key === " ") {
                setGameOver(false);
            }
        });
    }, [gameOver]);


  
 

    
    
    

  

    const onPressHandler = () => {
        setGameOver(false);
    };

    return (
<>      <Wall />
      <Ball />
      <Bat inputRef={inputRef} />
    {gameOver&&<><div style={{position:"absolute",top:"50%",left:"40%"}}>z,x - tilt bat, arrows - left,right</div><button style={{position:"absolute",top:"70%",left:"70%"}} onClick={onPressHandler}>Click or Space to Start</button></>}
      </>
  );
};

