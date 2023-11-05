

export  const createNewWall=(setBrickArray)=>{

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    console.log(windowWidth,windowHeight)

    setBrickArray((currArray)=>{
      const newArray=[]
      for(let rows=0;rows<10;rows++){
        if(rows%2===0){
  for (let i=0;i<20;i++){
    newArray.push(
      {
        id:i+(rows*(41/2)),
        height:windowHeight/50,
        width:windowWidth/20,
        colour:i%2===0?"red":"red",
        top:0+rows*(windowHeight/40),
        left:(windowWidth/20)*i
      }
    )
  }
}else{
  for (let i=0;i<21;i++){
    newArray.push(
      {
        id:i+(rows*(41/2)),
        height:windowHeight/50,
        width:(i===0||i===20)?windowWidth/40:windowWidth/20,
        colour:i%2===0?"red":"red",
        top:0+rows*(windowHeight/40),
        left:i===0||i===21?((windowWidth/20)*i):((windowWidth/20)*(i-1))+(windowWidth/20)/2
      }
    )
  }
}
      }

  return newArray

})
}