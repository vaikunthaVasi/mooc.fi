import React, { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [filteredPersons, setFilteredPersons] = useState(persons)

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNameChange = event => setNewName(event.target.value)
  const handleNumberChange = event => setNewNumber(event.target.value)
  const handleFilterChange = event => {
    setFilter(event.target.value)
    setFilteredPersons(persons.filter(person => person.name.toLowerCase().startsWith(event.target.value.toLowerCase())))
  }

  const handleSubmit = event => {
    event.preventDefault()
    
    if(!(newNumber && newName)) {
      alert(`please enter a valid entries in required fields`)
    } else {
      const names = persons.map(person => person.name)
      if(names.includes(newName)) {
        alert(`${newName} is already added to the phonebook`)
      } else {
        const newPerson = { name: newName, number: newNumber, id: persons.length + 1 }
        setPersons(persons.concat(newPerson))
        setFilteredPersons(persons.concat(newPerson))
        setFilter('')
        setNewName('') 
        setNewNumber('')
      }
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handler={handleFilterChange} value={filter}/>
      
      <h3>add a new</h3>
      <PersonForm 
        submitHandler={handleSubmit}
        nameHandler={handleNameChange}
        numberHandler={handleNumberChange}
        nameValue={newName}
        numberValue={newNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons}/>
    </div>
  )
}

export default App