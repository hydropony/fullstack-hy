import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    console.log("clicked!")
  }

  const increaseByOne = () => setCount(count + 1)
  const reset = () => setCount(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => increaseByOne()}>plus</button>
      <button onClick={() => reset()}>Reset</button>
    </div>
  )
}

export default App
