import React from 'react';
import ReactDOM from 'react-dom';



const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}


const Part = (props) => {
  return (
    <div>
      <p>{props.part} {props.excer}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part = {props.part1} excer = {props.excer1} />
      <Part part = {props.part2} excer = {props.excer2} />
      <Part part = {props.part3} excer = {props.excer3} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of excercises {props.excer1 + props.excer2 + props.excer3}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half stack application development'
  const part1 = 'Fundamentals of React'
  const excercises1 = 10
  const part2 = 'Using props to pass data'
  const excercises2 = 7
  const part3 = 'State of a component'
  const excercises3 = 14

  return (
    <div>
      <Header course={course}/>

      <Content part1 = {part1} excer1 = {excercises1} 
      part2= {part2} excer2 = {excercises2} 
      part3 = {part3} excer3 = {excercises3} />
      
      <Total excer1 = {excercises1} excer2 = {excercises2} excer3 = {excercises3} />
    </div>
  )
}

ReactDOM.render(<App />,document.getElementById('root'));


