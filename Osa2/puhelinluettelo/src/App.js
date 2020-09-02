import React, { useState, useEffect } from 'react'
import axios from 'axios'



const Render = ({person}) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}

const Persons = (props) => {
  return (
    <div>
      <ul>
        {props.persons.map(info => 
        <Render key={info.name} person={info} />
        )}
      </ul>
    </div>
  )
}

const Filter = (props) => {
  return (
    <div>
        filter shown with
        <input 
          value={props.filter}
          onChange={props.handleFilterChange}
        />
      </div>
  )
}

const AddNew = (props) => {
  return(
    <form onSubmit={props.addPerson}>
      <div>
        name: 
        <input 
          value={props.newName}
          onChange={props.handleNameChange}
        />
      </div>

      <div>
        number:
        <input 
          value={props.newNumber}
          onChange={props.handleNumberChange}/>
      </div>

      <div>
        <button type="submit">add</button>
        
      </div>
    </form>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter] = useState('')
  

  useEffect(() =>{
    axios.get('http://localhost:3001/persons').then(response => (
      setPersons(response.data)
    )
      )
  }, [])

  const addPerson = (event) =>{
    event.preventDefault()

    const names = persons.map(person => person.name)

    
    if(names.find(name => name===newName) === newName){
      alert(`${newName} is already added to phonebook`)
    }

    else{
      const personObject = {
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
    
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  //toimii, ebin
  const filterItems = () => {
    console.log(persons)
    console.log(filter)
    return persons.filter(person => 
      person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>Add a new</h2>
      <AddNew addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} 
      newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      
      <Persons persons={filterItems()} />

    </div>
  )

}

export default App
