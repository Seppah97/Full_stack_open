import React, { useState, useEffect } from 'react';
import communication from './communication';
import "./App.css"

//render one person from the phonebook to the screen
const Render = ({person, deletePerson}) => {
  return (
    <li>{person.name} {person.number} <button onClick={() => deletePerson(person.id)}>Delete</button></li>
  )
}

const Persons = (props) => {
  return (
    <div>
      <ul>
        {props.persons.map(info => 
        <Render key={info.name} person={info} deletePerson={props.deletePerson} />
        )}
      </ul>
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="message">
      {message}
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
  const [alertMessage, setAlertMessage] = useState(null)
  
  

  //retrieve contacts stored in db.json
  useEffect(() =>{
    communication.getAll().then(response => (
      setPersons(response.data)
    )
      )
  }, [])


  //add one person to the phonebook
  const addPerson = (event) =>{
    event.preventDefault()

    //const names = persons.map(person => (person.name, person.id))


    const findPerson = (name) => persons.find(person => person.name === name)


    if(findPerson(newName) !== undefined){
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const id = findPerson(newName).id
        updatePerson(newName, newNumber , id)
      }
      
    }

    else{
      const personObject = {
        name: newName,
        number: newNumber,
      }

      communication.addPerson(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))

          setAlertMessage(`Added ${newName}`)

          setTimeout(() => {
            setAlertMessage(null)
          }, 3000)

          setNewName('')
          setNewNumber('')
        })
    }
  }

  const updatePerson = (name, number, id) => {
    const personObject = {
      name: name,
      number: number,
    }

    communication.updatePerson(id, personObject)
        .then(response => {
          setPersons(persons.map(person => person.id !== id ? person : response.data))
          setAlertMessage(`Updated number of ${name}`)

          setTimeout(() => {
            setAlertMessage(null)
          }, 3000)

          setNewName('')
          setNewNumber('')
        })


  }

  const deletePerson = (id) => {
    
    const findName = (idnum) => persons.find(person => person.id === idnum)

    const name = findName(id).name

    if (window.confirm(`Delete ${name} ?`)){
      communication.deletePerson(id)
      .then(() => {
        console.log("Person deleted successfully")

        setAlertMessage(`Deleted ${name}`)

        setTimeout(() => {
          setAlertMessage(null)
        }, 3000)
        
        communication.getAll().then(response => (
          setPersons(response.data)
        ))
      })
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

  

  //filters phonebook contacts by contact name
  const filterItems = () => {
    console.log(persons)
    console.log(filter)
    return persons.filter(person => 
      person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={alertMessage} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>Add a new</h2>
      <AddNew addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} 
      newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      
      <Persons persons={filterItems()} deletePerson={deletePerson}/>

    </div>
  )

}

export default App
