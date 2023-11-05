import { createContext,useState } from "react";





export const GameContext = createContext();

export const GameProvider = ({children}) => {

    const [ballCoords, setBallCoords] = useState({ x: 0, y: 0,direction:45 });
    const [gameOver, setGameOver] = useState(true);
    const [batProps, setBatProps] = useState({ x: 0, y: 0, width: 50 });
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight;
    const [motionData, setMotionData] = useState({
        alpha: 0,
        beta: 0,
        gamma: 0,
      });
      const [brickArray, setBrickArray] = useState([]);


    return (
        <GameContext.Provider value={{
            ballCoords,setBallCoords,
            gameOver,setGameOver,
            batProps,setBatProps,
            windowWidth,
            windowHeight,
            motionData,
            setMotionData,
            brickArray,setBrickArray,
     
        }}>
        {children}
        </GameContext.Provider>
    )
}