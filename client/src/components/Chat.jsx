import React from 'react'
import Alert from './Alert'

function Chat(props) {
  if (props.isLogged === null) 
    return <Alert text='Login before acccessing the chat!' color='alert-warning' />

  return (
    <div>Chat {props.isLogged}</div>
  )
}

export default Chat