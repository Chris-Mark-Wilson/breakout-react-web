


export const Brick = ({height,width,colour,top,left }) => {

  return (

    <div style={{boxSizing:"contentBox",position:"absolute",display:"flex",border:"1px solid red",alignItems:"center",justifyContent:"center",height: `${height}px`, width:`${width}px`, top:top,left:left,backgroundColor:"orange"}}>
      {/* <div
      style={{display:"block",backgroundColor:colour,width:"50%",height:"50%"}}
      /> */}
     
      </div>
     
      );
    
};


