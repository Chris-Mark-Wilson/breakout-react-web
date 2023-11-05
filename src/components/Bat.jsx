
import { useContext } from "react"
import { GameContext } from "../contexts/gameContext"
import { useEffect } from "react"



import { useState } from "react";
export const Bat=({inputRef})=>{
    
    
    const{batProps,setBatProps,motionData,setMotionData,windowWidth,windowHeight}=useContext(GameContext)
    const [count,setCount]=useState(0)

    useEffect(()=>{//initial setup
      
              setBatProps((bat) => {
                const newBat={...bat}
                newBat.x= windowWidth / 2 - bat.width / 2
                newBat.y=windowHeight - 50,
                newBat.width=100
                  return newBat
                });
    },[])

 

   

return(
  <div tabIndex="0" ref={inputRef} style={{outline:"none",width:batProps.width,height:10,backgroundColor:"black",position:"absolute",top:batProps.y,left:batProps.x,borderTopWidth:10,borderRadius:batProps.width/2}}></div>
)
}