import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])

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
        personService.create(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
          setFilteredPersons(persons.concat(response.data))
        })
        setFilter('')
        setNewName('') 
        setNewNumber('')
      }
    }
  }

  const handleDelete = (id, name)=> {
    window.confirm(`Delete ${name}?`) &&
    personService.removeById(id)
    .then(response => {
      console.log('before', response)
      setPersons(persons.filter(person => person.id !== id))
      setFilteredPersons(persons.filter(person => person.id !== id))
      console.log('after', response)
  })
  }


  useEffect(() => {
    personService
    .getAll()
    .then(response => {
      setPersons(response.data)
      setFilteredPersons(response.data)
    })
  }, [])

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
      <Persons persons={filteredPersons} deleteHandler={handleDelete}/>
    </div>
  )
}

export default App