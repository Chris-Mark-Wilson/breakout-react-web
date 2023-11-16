
import { Wall } from "../components/Wall";
import { Ball } from "../components/Ball";
import { Bat } from "../components/Bat";
import { GameContext } from "../contexts/gameContext";
import { useContext, useState } from "react";
import { useRef, useEffect } from "react";
import { setNewCoords } from "../utils/setNewCoords";


export const GameScreen = () => {
    const {
        gameOver, setGameOver, batProps, setBatProps, windowHeight, windowWidth, ballCoords, setBallCoords
    } = useContext(GameContext);
    const inputRef = useRef(null)
    const [keyState, setKeyState] = useState({});
    const [count, setCount] = useState(0);
    const keyStateRef = useRef(keyState);
const batPropsRef = useRef(batProps);
const ballCoordsRef = useRef(ballCoords);
const gameOverRef = useRef(gameOver);

useEffect(() => {
  keyStateRef.current = keyState;
}, [keyState]);

useEffect(() => {
  batPropsRef.current = batProps;
}, [batProps]);

useEffect(() => {
  ballCoordsRef.current = ballCoords;
}, [ballCoords]);
useEffect(()=>{
    gameOverRef.current=gameOver
},[gameOver])
   
   //Ok so the only way I can get the gameloop to work without memory overflow is to use useRef and pass the refs to the gameloop function  as arguments
 

// initial setup
    useEffect(() => {
        
        setBatProps((bat)   => {
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
        if(!gameOver){
            requestAnimationFrame(() => {   
            gameLoop(keyStateRef,batPropsRef,ballCoordsRef,setBallCoords,windowWidth,windowHeight,gameOverRef,setGameOver,setBatProps,setNewCoords)
        })
    }
    return () => {
        // Cancel the animation frame when the component unmounts
            cancelAnimationFrame(requestAnimationFrame(() => {  gameLoop(keyStateRef,batPropsRef,ballCoordsRef,setBallCoords,windowWidth,windowHeight,gameOverRef,setGameOver,setBatProps,setNewCoords)}));
        inputRef.current.removeEventListener('keydown', function (e) {  setKeyState(state => {
            const newState = { ...state }
            newState[e.key] = true;
            return newState
        }) }, true);
    
        inputRef.current.removeEventListener('keyup', function (e) {  setKeyState(state => {
            const newState = { ...state }
            newState[e.key] = true;
            return newState
        }) }, true);    
    };

    }, [gameOver]);
  
////////////////////////////////////////////////////////////////////////////


//keyState,batProps,ballCoords,setBallCoords,windowWidth,windowHeight,gameOver,setGameOver,setBatProps,setNewCoords
  const gameLoop=(keyStateRef,batPropsRef,ballCoordsRef,setBallCoords,windowWidth,windowHeight,gameOverRef,setGameOver,setBatProps,setNewCoords)=>{
  if(!gameOverRef.current){
    setBallCoords((coords) => {
        const newCoords = { ...coords };
        const newer = setNewCoords(
            ballCoordsRef.current,
            setBallCoords,
            windowWidth,
            windowHeight,
            batPropsRef.current,
            setGameOver
        );
        newCoords.x = newer.x;
        newCoords.y = newer.y;
        newCoords.direction = newer.direction;
       
        return newCoords;
    })
  

    if (keyStateRef.current['ArrowLeft']) {
        setBatProps(current => {
            return { ...current, x: current.x - 10 }
        })
    }
    if (keyStateRef.current['ArrowRight']) {
        setBatProps(current => {
            return { ...current, x: current.x + 10 }
        })
    }
    if (keyStateRef.current['x']) {
        if (batProps.angle < 34) {
            setBatProps(current => {
                return { ...current, angle: current.angle + 2 }
            })
        }
            
    }
    if (keyStateRef.current['z']) {
        if (batProps.angle > -34) {
            setBatProps(current => {
                return { ...current, angle: current.angle - 2 }
            })
        }
               
    }

    requestAnimationFrame(() => {
        gameLoop(keyStateRef,batPropsRef,ballCoordsRef,setBallCoords,windowWidth,windowHeight,gameOverRef,setGameOver,setBatProps,setNewCoords)
       })

    }

  }

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

