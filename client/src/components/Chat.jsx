import React from 'react'

function Chat(props) {
  if (props.loggedUser === null) 
    return <h3 className='rounded m-auto py-1 px-2' style={{color: "red", background: 'white', width: 'fit-content'}}>Login before acccessing the chat!</h3>

  return (
    <div>Chat</div>
  )
}

export default Chat