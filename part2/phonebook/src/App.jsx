import React, { useState, useEffect } from 'react'
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

  const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(person => person.id))
    : 0
  return maxId + 1
}

  const handleSubmit = event => {
    event.preventDefault()
    
    if(!(newNumber && newName)) {
      alert(`please enter a valid entries in required fields`)
    } else {
      const names = persons.map(person => person.name)
      if(names.includes(newName)) {
        if(window.confirm(`Do you want to update ${newName}'s number to ${newNumber} ?`)) {
          const person = persons.find(person => person.name === newName)
          const newPerson = { ...person, number: newNumber }
          personService.edit(newPerson)
          .then(response => {
            console.log(response.data)
            setPersons(persons.map(person => person.id === response.data.id ? response.data : person))
            setFilteredPersons(persons.map(person => person.id === response.data.id ? response.data : person))
          })
          setFilter('')
          setNewName('')
          setNewNumber('') 
        }
      } else {
        const newPerson = { name: newName, number: newNumber, id: generateId() }
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