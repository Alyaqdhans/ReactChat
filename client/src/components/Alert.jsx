import React from 'react'

function Alert(props) {
  return (
    <ul className={'m-auto py-2 px-5 alert ' + props.color} style={{width: 'fit-content'}}>
      <li><h5>{props.text}</h5></li>
    </ul>
  )
}

export default Alert