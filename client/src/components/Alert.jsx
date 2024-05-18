import React from 'react'

function Alert({text, color='alert-danger'}) {
  return (
    <ul className={'py-2 px-5 mb-0 alert ' + color}>
      <li><h5>{text}</h5></li>
    </ul>
  )
}

export default Alert