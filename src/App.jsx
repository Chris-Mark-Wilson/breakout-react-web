import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { GameProvider } from "./contexts/gameContext";
import { GameScreen } from "./components/GameScreen";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <GameProvider>
<GameScreen/>
      </GameProvider>
    </>
  )
}

export default App
