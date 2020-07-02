import React, {useState} from 'react';
import ReactDOM from 'react-dom';


const StatisticLine = (props) => {

  if (props.text === 'Positive'){
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value * 100} %</td>
      </tr>
      
    )
  }

  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>    
    
  )
}

const Statistics = (props) => {

  if (props.allValues.length === 0){
    return (
      <div>
        No feedback given.
      </div>
    )
    
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text = "Good" value={props.good}/>
          <StatisticLine text = "Neutral" value={props.neutral}/>
          <StatisticLine text = "Bad" value={props.bad}/>
          <StatisticLine text = "All" value={props.allValues.length}/>
          <StatisticLine text = "Average" value={(props.good + props.neutral*0 + props.bad*(-1))/props.allValues.length}/>
          <StatisticLine text = "Positive" value={props.good / props.allValues.length}/>
        </tbody>
        
      </table>
      
    </div>
    
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}


const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allFeedback, setAll] = useState([])

  const handleGoodClick = () => {
      setAll(allFeedback.concat('G'))
      setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setAll(allFeedback.concat('N'))
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setAll(allFeedback.concat('B'))
    setBad(bad + 1)
  }



  return (
    <div>
      <div>
        <h1>Give feedback</h1>

        <Button onClick={handleGoodClick} text = 'Good'/>
        <Button onClick={handleNeutralClick} text = 'Neutral'/>
        <Button onClick={handleBadClick} text = 'Bad'/>
      </div>

      <div>
        <h1>Statistics</h1>

        

        <Statistics allValues = {allFeedback} good = {good} neutral = {neutral} bad = {bad}/>
      </div>
    </div>
  )
}

ReactDOM.render(<App />,document.getElementById('root'));


