
import { Wall } from "../components/Wall";
import { Ball } from "../components/Ball";
import { Bat } from "../components/Bat";
import { GameContext } from "../contexts/gameContext";
import { useContext, useState } from "react";
import { useRef,useEffect } from "react";

export const GameScreen = () => {
    const inputRef = useRef(null)
    const [count,setCount]=useState(0)
    const[keyState,setKeyState]=useState({});
 
    const {
        gameOver, setGameOver,batProps,setBatProps,windowHeight
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
        },2)
    },[count])

    useEffect(() => { 
        
        if(keyState['ArrowLeft']) {
            setBatProps(current => {
                return {...current, x: current.x - 10}
            })
         }
            if(keyState['ArrowRight']) {
                setBatProps(current => {
                    return {...current, x: current.x + 10}
                })
            }
            if(keyState['x']){
                if(batProps.angle<45){
                setBatProps(current => {
                    return {...current, angle: current.angle + 2}
                })
            }
            
            }
            if(keyState['z']){
                if(batProps.angle>-45){
                setBatProps(current => {
                    return {...current, angle: current.angle - 2}
                })
            }
               
            }
            if(keyState[' ']){
                setBatProps(current => {
                    return {...current, y: current.y - 4}
                })
            }
            if(!keyState[' ']&&batProps.y<windowHeight-50){
                setBatProps(current => {
                    return {...current, y: current.y + 1}
                })
            }

    }, [count,keyState,batProps])
    
    

  

    const onPressHandler = () => {
        setGameOver(false);
    };

    return (
<>      <Wall />
      <Ball />
      <Bat inputRef={inputRef} />
    {gameOver&&<button style={{position:"absolute",top:"70%",left:"70%"}} onClick={onPressHandler}>click</button>}
      </>
  );
};

