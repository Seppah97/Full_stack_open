import React, { useState } from 'react'
import ReactDOM from 'react-dom'

//renderöi painikkeet ruudulle
const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

//Renderöi eniten ääniä saaneen anekdootin selaimeen
const Votes = (props) => {

  //Jos ääniä ei ole vielä annettu, renderöidään tämä
  if (props.votes[props.mostVotes] === 0){
    return (
      <div>
        No votes given
      </div>
    )
  }

  return (
    <div>
      <div>
        {props.anecdotes[props.mostVotes]}
      </div>
      Has {props.votes[props.mostVotes]} votes
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(6).fill(0))
  const [mostVotes, setMostVotes] = useState(0)
  
  //lisää äänen käsiteltävälle anekdootille sekä määrittää eniten ääniä saaneen anekdootin
  const givePoints = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    setMostVotes(copy.indexOf(Math.max(...copy)))
  }

  //luo randomin numeron väliltä 0-6 ja valitsee seuraavan anekdootin
  const nextAnecdote = () =>{
    const next = Math.floor(Math.random() * 6)
    setSelected(next)
    
  }  

  
  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
      </div>
      <div>
        {props.anecdotes[selected]}
      </div>
      <div>
        Has {votes[selected]} votes
      </div>
      <div>
        
        <Button onClick = {givePoints} text = 'Vote' />
        <Button onClick = {nextAnecdote} text = 'Next anecdote' />
        
      </div>

      <div>
        <h1>Anecdote with most votes</h1>

        <Votes anecdotes = {props.anecdotes} votes = {votes} mostVotes = {mostVotes} />
      </div>
    </div>
    
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
