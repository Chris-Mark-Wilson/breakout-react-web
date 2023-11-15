
import { useContext } from "react"
import { GameContext } from "../contexts/gameContext"
import { useEffect } from "react"



import { useState } from "react";
export const Bat=({inputRef})=>{
    
    
    const{batProps,setBatProps,windowWidth,windowHeight}=useContext(GameContext)
   
  

 
  

 

   

return(
  <>
  <div tabIndex="0" ref={inputRef} style={{outline:"none",width:batProps.width, 
  height: "50px",  
  border:" solid 5px #000",
  borderColor:"#000 transparent transparent transparent",
  borderRadius:" -50%/-50px -50px 0 0",
position:"absolute",top:batProps.y,left:batProps.x-(batProps.width/2),
transform:`rotate(${batProps.angle}deg)` }}>
</div>
  <div style={{backgroundColor:"red",position:"absolute",height:"4px",width:"4px",top:batProps.y+25,left:batProps.x}}></div>
</>
)
}