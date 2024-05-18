import React, { useState } from 'react'

const Filter = ({ handler, value }) => {

  return (
    <>
        filter shown with <input onChange={handler} value={value} />
    </>
  )
}

export default Filter
