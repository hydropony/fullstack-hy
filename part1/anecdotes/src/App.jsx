import { useState } from 'react'

const Button = (props) => {
  return (
    <div>
      <button onClick={props.onClick}>{props.text}</button>
    </div>
  )
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const vote = (array, index) => {
  const copy = [...array]
  copy[index] += 1
  return copy
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [voteArray, setVoteArray] = useState(new Uint8Array(anecdotes.length))
  // console.log(voteArray.indexOf(Math.max(...voteArray)))
  

  return (
    <div>
      <p><b><font size="+2">Anecdote of the day</font></b></p>
      <p>{anecdotes[selected]}</p>
      <p/>has {voteArray[selected]}
      <Button text="next anecdote" onClick={() => setSelected(getRandomInt(0, anecdotes.length))}></Button>
      <Button text="vote" onClick={() => setVoteArray(vote(voteArray, selected))}></Button>
      <p><b><font size="+2">Anecdote with most votes</font></b></p>
      <p>{anecdotes[voteArray.indexOf(Math.max(...voteArray))]}</p>
    </div>
  )
}

export default App