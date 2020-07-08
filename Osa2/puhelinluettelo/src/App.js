import React, { useState } from 'react'



const Render = ({person}) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}




const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter] = useState('')
  
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

    return persons.filter(person => 
      person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with
        <input 
          value={filter}
          onChange={handleFilterChange}
        />
      </div>

      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>

        <div>
          number:
          <input 
            value={newNumber}
            onChange={handleNumberChange}/>
        </div>

        <div>
          <button type="submit">add</button>
          
        </div>
      </form>
      <h2>Numbers</h2>
      
      <ul>
        
        {filterItems().map(info => 
        <Render key={info.name} person={info} />
        )}
      </ul>

    </div>
  )

}

export default App