import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={() => props.click(props.value + 1)}>{props.text}</button>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics =  (props) => {
  const { good, neutral, bad } = props;

  const total = good + neutral + bad;

  return (
    total > 0 ?
      <>
        <h1>statistics</h1>
      
        <table>
          <tbody>
            <StatisticLine text="good" value={good}/>
            <StatisticLine text="neutral" value={neutral}/>
            <StatisticLine text="bad" value={bad}/>

            <tr>
              <td>all</td>
              <td>{total}</td>
            </tr>
            <tr>
              <td>average</td>
              <td>{(good - bad) / (total) || 0}</td>
            </tr>
            <tr>
              <td>positive</td>
              <td>{(good / (total)) * 100 || 0}%</td>
            </tr>
          </tbody>
        </table>
      </>
    :
    <p>No feedback given</p>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" value={good} click={setGood}/>
      <Button text="neutral" value={neutral} click={setNeutral}/>
      <Button text="bad" value={bad} click={setBad}/>

      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App