
import { Wall } from "../components/Wall";
import { Ball } from "../components/Ball";
import { Bat } from "../components/Bat";
import { GameContext } from "../contexts/gameContext";
import { useContext, useState } from "react";
import { useRef,useEffect } from "react";

export const GameScreen = () => {
    const inputRef = useRef(null)
    const [count,setCount]=useState(0)
 
    const {
        gameOver, setGameOver,setBatprops
    } = useContext(GameContext);


    useEffect ( () => {
        inputRef.current.focus();
    }, [gameOver]);


    window.addEventListener('keydown',function(e){
        keyState[e.key] = true;
    },true);    
    window.addEventListener('keyup',function(e){
        keyState[e.key] = false;
    }, true);
    useEffect(() => {
        setTimeout(() => {
            setCount(count + 1)
        })
    },[count])

    useEffect(() => { 
        if(keyState['ArrowLeft']) {
            setBatprops(current => {
                return {...current, x: current.x - 5}
            })
         }
            if(keyState['ArrowRight']) {
                setBatprops(current => {
                    return {...current, x: current.x + 5}
                })
            }
    }, [count])
    
    

  

    const onPressHandler = () => {
        setGameOver(false);
    };

    return (
        <div style={{ 
            display: "flex",
            boxSizing: "border-box",
    backgroundColor: "lightgrey",
    alignItems: "center",
    justifyContent: "center",
    border:"1px solid green",
    
    width: "100%",
    height: "90%"}}>
      {gameOver && (
        <button style={{  backgroundColor: "white",
        position: "absolute",
        top: "70%",
        left: "70%",}} onClick={onPressHandler}>
        Tap to start
        </button>
      )}
      <Wall />
      <Ball />
      <Bat inputRef={inputRef} />
    
    </div>
  );
};

