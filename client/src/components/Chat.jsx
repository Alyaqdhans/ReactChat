import React from 'react'
import Alert from './Alert'

function Chat(props) {
  if (props.loggedUser === null) 
    return <Alert text='Login before acccessing the chat!' color='alert-warning' />

  return (
    <div>Chat</div>
  )
}

export default Chat