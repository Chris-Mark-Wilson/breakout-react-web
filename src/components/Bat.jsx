
import { useContext } from "react"
import { GameContext } from "../contexts/gameContext"
import { useEffect } from "react"



import { useState } from "react";
export const Bat=({inputRef})=>{
    
    
    const{batProps,setBatProps,windowWidth,windowHeight}=useContext(GameContext)
   
  

 
  
    useEffect(()=>{//initial setup
      
              setBatProps((bat) => {
                const newBat={...bat}
                newBat.x= windowWidth / 2 
                newBat.y=windowHeight - 80,
                newBat.width=100
                  return newBat
                });


      inputRef.current.addEventListener('keydown',function(e){
         setKeyState(state=>{
          const newState={...state}
          newState[e.key]=true;
          return newState
         })
      },true);    
      inputRef.current.addEventListener('keyup',function(e){
          setKeyState(state=>{
              const newState={...state}
              newState[e.key]=false;
              return newState
             })
      }, true);

      return ()=>{
        inputRef.current.removeEventListener('keydown',function(e){
          setKeyState(state=>{
           const newState={...state}
           newState[e.key]=true;
           return newState
          })
       },true);    
       inputRef.current.removeEventListener('keyup',function(e){
           setKeyState(state=>{
               const newState={...state}
               newState[e.key]=false;
               return newState
              })
       }, true);
      }           
  },[])
  useEffect(() => { 
        
    if(keyState['ArrowLeft']) {
        setBatProps(current => {
            return {...current, x: current.x - 5}
        })
     }
        if(keyState['ArrowRight']) {
            setBatProps(current => {
                return {...current, x: current.x + 5}
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
      
       

}, [keyState,batProps])

 

   

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