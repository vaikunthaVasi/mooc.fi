import React from 'react'

const Filter = ({ onchange, value }) => {
  return (
    <>
        find countries <input onChange={onchange} value={value}/>
    </>
  )
}

export default Filter
