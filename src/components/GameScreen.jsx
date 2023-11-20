import { Wall } from "../components/Wall";
import { Ball } from "../components/Ball";
import { Bat } from "../components/Bat";
import { GameContext } from "../contexts/gameContext";
import { useContext, useState } from "react";
import { useRef, useEffect } from "react";
import { getNewCoords } from "../utils/getNewCoords";
import { StartText } from "../components/StartText";
import { checkSides } from "../utils/checkSides";
import { checkBricks } from "../utils/checkBricks";
import { deleteBrick } from "../utils/deleteBrick";
import { checkBat } from "../utils/checkBat";
import { getBatRebound } from "../utils/getBatRebound";

export const GameScreen = () => {
  const {
    gameOver,
    setGameOver,
    batProps,
    setBatProps,
    windowHeight,
    windowWidth,
    ballCoords,
    setBallCoords,
    brickArray,
    setBrickArray,
  } = useContext(GameContext);
    const batSpeed=10 //speed of bat movement
  const startRef = useRef(null);
  const inputRef = useRef(null);
  const [keyState, setKeyState] = useState({});

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
  useEffect(() => {
    gameOverRef.current = gameOver;
  }, [gameOver]);

  //Ok so the only way I can get the gameloop to work without memory overflow is to use useRef and pass the refs to the gameloop function  as arguments
  //I have tried to use the state variables directly but it causes memory overflow
  //I have tried to use the state variables in the dependency array of the useEffect but it causes memory overflow
  //I have tried to use the state variables in the dependency array of the useEffect and pass the state variables to the gameloop function as arguments but it causes memory overflow
  //This way the useRef ensures the state variables are not recreated on every render and the dependency array ensures the gameloop function is called only when the state variables change

  // initial setup
  useEffect(() => {
    setBatProps((bat) => {
      const newBat = { ...bat };
      newBat.x = windowWidth / 2;
      (newBat.y = windowHeight - 100), (newBat.width = 100);
      return newBat;
    });

    const startY = windowHeight - 110;
    const startX = windowWidth / 2;
    setBallCoords((coords) => {
      const newCoords = { ...coords };
      newCoords.x = startX;
      newCoords.y = startY;
      return newCoords;
    });

    inputRef.current.addEventListener(
      "keydown",
      function (e) {
        setKeyState((state) => {
          const newState = { ...state };
          newState[e.key] = true;
          return newState;
        });
      },
      true
    );

    inputRef.current.addEventListener(
      "keyup",
      function (e) {
        setKeyState((state) => {
          const newState = { ...state };
          newState[e.key] = false;
          return newState;
        });
      },
      true
    );

      inputRef.current.focus();
      requestAnimationFrame(() => {
          batLoop(keyStateRef, setBatProps,setGameOver,batSpeed);
      },true)   

    return () => {
      // Cancel the animation frame when the component unmounts
      cancelAnimationFrame(
        requestAnimationFrame(() => {
          gameLoop(
            keyStateRef,
            batPropsRef,
            ballCoordsRef,
            setBallCoords,
            windowWidth,
            windowHeight,
            gameOverRef,
            setGameOver,
            setBatProps,
            getNewCoords,
            brickArrayRef,
            setBrickArray
          );
        })
      );

      inputRef.current.removeEventListener(
        "keydown",
        function (e) {
          setKeyState((state) => {
            const newState = { ...state };
            newState[e.key] = true;
            return newState;
          });
        },
        true
      );

      inputRef.current.removeEventListener(
        "keyup",
        function (e) {
          setKeyState((state) => {
            const newState = { ...state };
            newState[e.key] = true;
            return newState;
          });
        },
        true
      );
    };
  }, []);

  useEffect(() => {
    //start game loop

    requestAnimationFrame(() => {
      gameLoop(
        keyStateRef,
        batPropsRef,
        ballCoordsRef,
        setBallCoords,
        windowWidth,
        windowHeight,
        gameOverRef,
        setGameOver,
        setBatProps,
        getNewCoords,
        brickArrayRef,
        setBrickArray,
        startRef
      );
        // batLoop(keyStateRef,setBatProps,setGameOver,batSpeed);
    });
  }, [gameOver]);

  ////////////////////////////////////////////////////////////////////////////

  // could possible do this inside the initial useEffect but using refs to pass the state variables to the gameloop function as arguments
  // and using the state variables in the dependency array of the useEffect causes memory overflow
  const gameLoop = (
    keyStateRef,
    batPropsRef,
    ballCoordsRef,
    setBallCoords,
    windowWidth,
    windowHeight,
    gameOverRef,
    setGameOver,
    setBatProps,
    getNewCoords,
    brickArrayRef,
    setBrickArray,
    startRef
  ) => {
  
    if (!gameOverRef.current) {
        inputRef.current.focus();
        const speed = ((204 - brickArrayRef.current.length) / 20) + 8;

      //move ball according to direction
        let { x, y, direction } = getNewCoords(
          speed,
        ballCoordsRef.current
      );

      //check if ball has hit the sides or top of the screen and change direction accordingly
      ({ x, y, direction } = checkSides(x, y, direction, windowWidth));

      // if ball is in brick area of screen check if it has hit a brick
        const hitBrick = checkBricks(brickArrayRef.current, x, y,windowHeight);
      
        //if so delete brick and calculate new direction
        if (hitBrick) {
        direction  = deleteBrick(setBrickArray, hitBrick,direction);
      }
        
        //check if hit bat
        if (checkBat(x, y, batPropsRef.current)) {
        
          //if so calculate new direction
          ({ x, y, direction } = getBatRebound(
            x,
            y,
            batPropsRef.current.angle,
              direction,
            speed
          ));
            
        }

        //adjust for calculation errors
        if (direction < 0) direction = 360 - direction;
        if (direction > 360) direction = direction - 360;

        /////////////////////////////////////////
        //check for dropped ball
        if (y >= windowHeight) {
          console.log("stop");
          // placeholder for game over/ dropped ball
         
            console.log(batPropsRef.current)
            x = batPropsRef.current.x;
            y = batPropsRef.current.y - 10;
            direction = batPropsRef.current.angle>=0?batPropsRef.current.angle:360-batPropsRef.current.angle;
            setBallCoords({ x, y, direction });
          setGameOver(true);
        }
        /////////////////////////////////////

        setBallCoords({ x, y, direction });

      //recursive call to gameLoop
      requestAnimationFrame(() => {
        gameLoop(
          keyStateRef,
          batPropsRef,
          ballCoordsRef,      
          setBallCoords,
          windowWidth,
          windowHeight,
          gameOverRef,
          setGameOver,
          setBatProps,
          getNewCoords,
          brickArrayRef,
          setBrickArray,
          startRef
        );
      });
    }  
    
  };
    
    const batLoop = (keyStateRef, setBatProps,setGameOver,batSpeed) => {
        if (gameOverRef.current && keyStateRef.current[" "]) {
            setGameOver(false);
        }
        if (keyStateRef.current["ArrowLeft"]) {
            if (batPropsRef.current.x > batPropsRef.current.width / 2) {
              setBatProps((current) => {
                return { ...current, x: current.x - batSpeed/2 };
              });
            }
          }
          if (keyStateRef.current["ArrowRight"]) {
            if (
              batPropsRef.current.x <
              windowWidth - batPropsRef.current.width / 2
            ) {
              setBatProps((current) => {
                return { ...current, x: current.x + batSpeed/2 };
              });
            }
          }
          if (keyStateRef.current["x"]) {
            if (batPropsRef.current.angle < 34) {
              setBatProps((current) => {
                return { ...current, angle: current.angle + 2 };
              });
            }
          }     
          if (keyStateRef.current["z"]) {
            if (batPropsRef.current.angle > -34) {
              setBatProps((current) => {
                return { ...current, angle: current.angle - 2 };
              });
            }
          }
        requestAnimationFrame(() => {
            batLoop(keyStateRef, setBatProps,setGameOver,batSpeed);
        },true)
    }

  return (
    <>
      {" "}
      <Wall />
      <Ball />
      <Bat inputRef={inputRef} />
      {gameOver && <StartText startRef={startRef} setGameOver={setGameOver} />}
    </>
  );
};
