
import { Wall } from "../components/Wall";
import { Ball } from "../components/Ball";
import { Bat } from "../components/Bat";
import { GameContext } from "../contexts/gameContext";
import { useContext, useState } from "react";
import { useRef, useEffect } from "react";


export const GameScreen = () => {
    const inputRef = useRef(null)
    const [count,setCount]=useState(0)
    const[keyState,setKeyState]=useState({});
 
    const {
        gameOver, setGameOver,batProps,setBatProps,windowHeight,windowWidth,ballCoords,setBallCoords
    } = useContext(GameContext);


    useEffect ( () => {
        inputRef.current.focus();
    }, [gameOver]);

    useEffect(()=>{

    window.addEventListener('keydown',function(e){
       setKeyState(state=>{
        const newState={...state}
        newState[e.key]=true;
        return newState
       })
    },true);    
    window.addEventListener('keyup',function(e){
        setKeyState(state=>{
            const newState={...state}
            newState[e.key]=false;
            return newState
           })
    }, true);
},[])
    useEffect(() => {
        setTimeout(() => {
            setCount(count + 1)
        },10)
    },[count])

    useEffect(() => { 
        
        if (keyState['ArrowLeft']) {
           
            setBatProps(current => {
                if (current.x > current.width / 2) {
                    return { ...current, x: current.x - 10 }
                } else {
                    return current
                }
            })
        }
         
        if (keyState['ArrowRight']) {
                
            setBatProps(current => {
                if (current.x < windowWidth - current.width / 2) {
                    return { ...current, x: current.x + 10 }
                } else {
                    return current
                }
                })
            }
            if(keyState['x']){
                if(batProps.angle<34){
                setBatProps(current => {
                    return {...current, angle: current.angle + 2}
                })
            }
            
            }
            if(keyState['z']){
                if(batProps.angle>-34){
                setBatProps(current => {
                    return {...current, angle: current.angle - 2}
                })
            }
               
            }
           if(keyState[' ']){
               setGameOver(false)
           }    
           

    }, [count,keyState,batProps])
    
    

  

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

