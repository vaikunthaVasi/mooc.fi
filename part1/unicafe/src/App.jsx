import { useState } from 'react'

const StatisticLine = ({ text, value }) => {
  return(
    <>{text} {value} <br /></>
  )
}

const Button = ({ text, handler }) => {
  return(
    <>
      <button onClick={handler}>{text}</button>
    </>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = good / total 

  return(
    <>
      <h2>statistics</h2>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='all' value={total} />
      <StatisticLine text='average' value={average} />
      <StatisticLine text='positive' value={positive} />
    </>
  )
}

function App() {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <>
      <h2>give feedback</h2>
      <Button handler={handleGood} text='good' />
      <Button handler={handleNeutral} text='neutral' />
      <Button handler={handleBad} text='bad' />

      { (good || bad || neutral) ? 
        <Statistics 
          good={good}
          bad={bad}
          neutral={neutral} 
        /> : 
        ""
      }
    </>
  )
}

export default App
