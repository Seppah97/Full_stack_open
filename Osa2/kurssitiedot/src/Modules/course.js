import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
  }
  
  const Total = ({ course }) => {
    
    const sum = course.parts.reduce((total, part) => total + part.exercises,0)
    return(
      <p style={{fontWeight: "bold"}}>Total of {sum} exercises</p>
    ) 
  }
  
  const Part = (props) => {
    
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    
    return (
      <div>
        {course.parts.map(part =>
          <Part key = {part.id} part={part}/>
    )}
        
      </div>
    )
  }
  
  const Course = ({course}) =>{
    return (
      <div>
        <Header course = {course}/>
        <Content course = {course}/>
        <Total course = {course}/>
      </div>
    )
    
  }


export default Course