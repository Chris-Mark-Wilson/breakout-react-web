export const StartText = ({ startRef,setGameOver }) => {
    const onPressHandler = () => {
        setGameOver(false);
      };
    return (
        <>
        <div style={{ position: "absolute", top: "50%", left: "40%" }}>
          z,x - tilt bat, arrows - left,right
        </div>
        <button
          ref={startRef}
          tabIndex={0}
          style={{ position: "absolute", top: "70%", left: "40%" }}
          onClick={onPressHandler}
        >
          Click, Space or Enter to Start
        </button>
      </>
    )
}