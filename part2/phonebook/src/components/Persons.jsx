import React from 'react'

const Person = ({ person, deleteHandler }) => {

    return(
      <>
       <p>{person.name} {person.number} <button onClick={() => deleteHandler(person.id, person.name)}>delete</button></p>
      </>
    )
}

const Persons = ({ persons, deleteHandler }) => {
  return (
    <>
        {persons.map(person => <Person key={person.id} person={person} deleteHandler={deleteHandler}/>)}
    </>
  )
}

export default Persons
