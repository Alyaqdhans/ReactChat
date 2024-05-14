import React from 'react'

function Alert({text, color='alert-danger'}) {
  return (
    <ul className={'m-auto py-2 px-5 alert ' + color} style={{width: 'fit-content'}}>
      <li><h5>{text}</h5></li>
    </ul>
  )
}

export default Alert