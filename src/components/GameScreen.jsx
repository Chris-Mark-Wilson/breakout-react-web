
import { Wall } from "../components/Wall";
import { Ball } from "../components/Ball";
import { Bat } from "../components/Bat";
import { GameContext } from "../contexts/gameContext";
import { useContext, useState } from "react";
import { useRef, useEffect } from "react";
import { setNewCoords } from "../utils/setNewCoords";


export const GameScreen = () => {
    const inputRef = useRef(null)
    const [keyState, setKeyState] = useState({});
   
   
 
    const {
        gameOver, setGameOver, batProps, setBatProps, windowHeight, windowWidth, ballCoords, setBallCoords
    } = useContext(GameContext);


    useEffect(() => {
        
        setBatProps((bat) => {
            const newBat = { ...bat }
            newBat.x = windowWidth / 2
            newBat.y = windowHeight - 50,
                newBat.width = 100
            return newBat
        });

        const startY = windowHeight - 60;
        const startX = windowWidth / 2;
        setBallCoords((coords) => {
            const newCoords = { ...coords };
            newCoords.x = startX;
            newCoords.y = startY;
            return newCoords;
        });
        
        
        
        inputRef.current.addEventListener('keydown', function (e) {
            setKeyState(state => {
                const newState = { ...state }
                newState[e.key] = true;
                return newState
            })
        }, true);
        inputRef.current.addEventListener('keyup', function (e) {
            setKeyState(state => {
                const newState = { ...state }
                newState[e.key] = false;
                return newState
            })
        }, true);
    
  
        inputRef.current.focus();
        window.addEventListener("keydown", (e) => {
            if (e.key === " ") {
                setGameOver(!gameOver);
            }
        });
      
        
     
     
    }, [gameOver]);

    useEffect(() => {
     
        if (!gameOver) {
           
            setBallCoords((coords) => {
                const newCoords = { ...coords };
                const newer = setNewCoords(
                    ballCoords,
                    setBallCoords,
                    windowWidth,
                    windowHeight,
                    batProps,
                    setGameOver
                );
                newCoords.x = newer.x;
                newCoords.y = newer.y;
                newCoords.direction = newer.direction;
               
                return newCoords;
            })
          

            if (keyState['ArrowLeft']) {
                setBatProps(current => {
                    return { ...current, x: current.x - 10 }
                })
            }
            if (keyState['ArrowRight']) {
                setBatProps(current => {
                    return { ...current, x: current.x + 10 }
                })
            }
            if (keyState['x']) {
                if (batProps.angle < 34) {
                    setBatProps(current => {
                        return { ...current, angle: current.angle + 2 }
                    })
                }
                    
            }
            if (keyState['z']) {
                if (batProps.angle > -34) {
                    setBatProps(current => {
                        return { ...current, angle: current.angle - 2 }
                    })
                }
                       
            }
        }
           
      
        
        
    
},[keyState,batProps,ballCoords,setBallCoords,windowWidth,windowHeight,gameOver,setGameOver,setBatProps,setNewCoords])

  

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

