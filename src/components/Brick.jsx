


export const Brick = ({height,width,colour,top,left }) => {

  return (
    <div style={{position:"absolute",display:"flex",border:"1px",alignItems:"center",justifyContent:"center",padding:"0px",paddingBottom:"1px",flexDirection:"row",height: `${height}px`, width:`${width}px`, top:top,left:left}}>
      <div
      style={{display:"flex",backgroundColor:colour,height:`${height-1}px`,width:`${width-1}px`}}
      />
      </div>
      );
    
};


