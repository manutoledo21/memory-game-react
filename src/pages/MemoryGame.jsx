import Cards from '../components/Cards/Cards'
import Counter from '../components/Counter/Counter'
import { GameProvider } from '../contexts/GameContext'

const MemoryGame = () => {
  return (
    <>
      <GameProvider>
        <Counter />
        <Cards />
      </GameProvider>
    </>
  )
}

export default MemoryGame
