import React from 'react'

const Notification = ({ message }) => {
    if(message === null) {
        return null
    }

    const errorStyle = { 
        color: '#000',
        background: 'rgba(0, 256, 0, 0.3)',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }
  return (
    <div className='error' style={errorStyle}>
      { message }
    </div>
  )
}

export default Notification
