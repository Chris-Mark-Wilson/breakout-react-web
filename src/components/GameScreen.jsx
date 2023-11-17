
import { Wall } from "../components/Wall";
import { Ball } from "../components/Ball";
import { Bat } from "../components/Bat";
import { GameContext } from "../contexts/gameContext";
import { useContext, useState } from "react";
import { useRef, useEffect } from "react";
import { setNewCoords } from "../utils/setNewCoords";


export const GameScreen = () => {
    const {
        gameOver, setGameOver, batProps, setBatProps, windowHeight, windowWidth, ballCoords, setBallCoords,brickArray,setBrickArray
    } = useContext(GameContext);
    const inputRef = useRef(null)
    const [keyState, setKeyState] = useState({});
    const [count, setCount] = useState(0);
    const keyStateRef = useRef(keyState);
const batPropsRef = useRef(batProps);
const ballCoordsRef = useRef(ballCoords);
const gameOverRef = useRef(gameOver);
const brickArrayRef = useRef(brickArray);
useEffect(() => {
    brickArrayRef.current = brickArray;
    }, [brickArray]);
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
    //I have tried to use the state variables directly but it causes memory overflow
    //I have tried to use the state variables in the dependency array of the useEffect but it causes memory overflow
    //I have tried to use the state variables in the dependency array of the useEffect and pass the state variables to the gameloop function as arguments but it causes memory overflow
    //This way the useRef ensures the state variables are not recreated on every render and the dependency array ensures the gameloop function is called only when the state variables change
 

// initial setup
    useEffect(() => {
        
        setBatProps((bat)   => {
            const newBat = { ...bat }
            newBat.x = windowWidth / 2
            newBat.y = windowHeight - 100,
                newBat.width = 100
            return newBat
        });

        const startY = windowHeight - 110;
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
        
   
    return () => {
        // Cancel the animation frame when the component unmounts
            cancelAnimationFrame(requestAnimationFrame(() => {  gameLoop(keyStateRef,batPropsRef,ballCoordsRef,setBallCoords,windowWidth,windowHeight,gameOverRef,setGameOver,setBatProps,setNewCoords,brickArrayRef,setBrickArray)}));

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

    }, []);

    useEffect(() => {
             //start game loop
             if (!gameOver) {
            
                inputRef.current.focus();
    
                requestAnimationFrame(() => {   
                gameLoop(keyStateRef,batPropsRef,ballCoordsRef,setBallCoords,windowWidth,windowHeight,gameOverRef,setGameOver,setBatProps,setNewCoords,brickArrayRef,setBrickArray)
            })
        }
    },[gameOver])
  
////////////////////////////////////////////////////////////////////////////

// could possible do this inside the initial useEffect but using refs to pass the state variables to the gameloop function as arguments
// and using the state variables in the dependency array of the useEffect causes memory overflow
 const gameLoop=(keyStateRef,batPropsRef,ballCoordsRef,setBallCoords,windowWidth,windowHeight,gameOverRef,setGameOver,setBatProps,setNewCoords,brickArrayRef,setBrickArray)=>{
     if (!gameOverRef.current) {
      console.log(keyStateRef.current)
    setBallCoords((coords) => {
        const newCoords = { ...coords };
        const newer = setNewCoords(
            ballCoordsRef.current,
            setBallCoords,
            windowWidth,
            windowHeight,
            batPropsRef.current,
            setGameOver,
            brickArrayRef.current,
            setBrickArray
        );
        newCoords.x = newer.x;
        newCoords.y = newer.y;
        newCoords.direction = newer.direction;
       
        return newCoords;
    })
  

      if (keyStateRef.current['ArrowLeft']) {
          if (batPropsRef.current.x > batPropsRef.current.width / 2) {
              setBatProps(current => {
                  return { ...current, x: current.x - 10 }
              })
          }
    }
      if (keyStateRef.current['ArrowRight']) {     //start game loop
      
          if (batPropsRef.current.x < windowWidth - batPropsRef.current.width / 2) {
              setBatProps(current => {
                  return { ...current, x: current.x + 10 }
              })
          }
    }
    if (keyStateRef.current['x']) {
        if (batPropsRef.current.angle < 34) {
            setBatProps(current => {
                return { ...current, angle: current.angle + 2 }
            })
        }
            
    }
    if (keyStateRef.current['z']) {
        if (batPropsRef.current.angle > -34) {
            setBatProps(current => {
                return { ...current, angle: current.angle - 2 }
            })
        }
               
    }
         if (keyStateRef.current[' ']) {
             setGameOver(!gameOverRef.current);
            }
    //recursive call to gameLoop
    requestAnimationFrame(() => {
        gameLoop(keyStateRef,batPropsRef,ballCoordsRef,setBallCoords,windowWidth,windowHeight,gameOverRef,setGameOver,setBatProps,setNewCoords,brickArrayRef,setBrickArray)
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

