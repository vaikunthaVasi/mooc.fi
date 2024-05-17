import React from 'react'

const Header = ({ courseName }) => {
  return(
    <h1>{ courseName }</h1>
  )
}

const Part = ({ name, exercises }) => {
  return(
    <p>{ name } { exercises }</p>
  )
}

const Content = ({ parts }) => {
  return(
    <>
       { parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />) }
    </>
  )
}

const Total = ({ parts }) => {
  return(
    <p><strong>Number of exercises { parts.reduce((total, part) => total + part.exercises, 0) }</strong></p>
  )
}



const Course = ({ course }) => {
  return (
    <>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default Course
