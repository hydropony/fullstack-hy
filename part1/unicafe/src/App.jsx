import { useState } from 'react'

const Button = (props) => {
  return (
    <div>
      <button onClick={props.onClick}>{props.text}</button>
    </div>
  )
}

const StatisticLine = ({text, value}) => {
  return <div><p>{text} {value}</p></div>
}

const Statistics = ({good, neutral, bad}) => {
  if (good === 0 & neutral === 0 & bad === 0) {
    return <div><p>No feedback given</p></div>
  }
  else {
    return (
      <div>
        <p><b><font size="+2">Statistics</font></b></p>
        <StatisticLine text="good" value={good}></StatisticLine>
        <StatisticLine text="neutral" value={neutral}></StatisticLine>
        <StatisticLine text="bad" value={bad}></StatisticLine>
        <StatisticLine text={"all"} value={good + bad + neutral}></StatisticLine>
        <StatisticLine text={"average"} value={(good - bad) / (good + bad + neutral)}></StatisticLine>
        <StatisticLine text={"positive"} value={good / (good + bad + neutral) * 100}></StatisticLine>
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <p><b><font size="+2">give feedback</font></b></p>
      <table>
        <tbody>
          <tr>
            <td><Button text="good" onClick={() => setGood(good + 1)}></Button></td>
            <td><Button text="neutral" onClick={() => setNeutral(neutral + 1)}></Button></td>
            <td><Button text="bad" onClick={() => setBad(bad + 1)}></Button></td>
          </tr>
        </tbody>
      </table>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App