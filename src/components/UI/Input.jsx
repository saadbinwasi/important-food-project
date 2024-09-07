import React from 'react'

function Input({label,id,...props}) {
  return (
    <p className='control'>
    <label htmlFor={id}>{label}</label>
    <input {...props} id={id} name={id} required/>
    </p>
  )
}

export default Input
