import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import { getAll } from './services/countryService'
import Information from './components/Information'

function App() {

  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])

  const handleChange = event => {
    setFilter(event.target.value)
    setCountriesToShow(countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
  }


  useEffect(() => {
    getAll()
    .then(response => {
      setCountries(response.data)
    })
  }, [])



  return (
    <>
      <Filter onchange={handleChange} value={filter}/>
      {countriesToShow.length ? <Information countries={countriesToShow} /> : "" }
    </>
  )
}

export default App
