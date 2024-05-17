import React, { useEffect, useState } from 'react'
import Alert from './Alert'
import moment from 'moment-timezone'
import ScrollToBottom from 'react-scroll-to-bottom'

function Chat({isLogged, socket, userCount}) {
  if (isLogged === null) 
    return <Alert text='Login before acccessing the chat!' color='alert-warning' />

  const [message, setMessage] = useState("")
  const [messageList, setMessageList] = useState([])

  const sendMessage = async () => {
    if (!message) return

    const date = moment.tz(new Date(Date.now()), "Asia/Muscat")
    const messageData = {
      username: isLogged,
      message: message,
      date: date.format('D/M/Y h:m A')
    }

    await socket.emit("send_message", messageData)
    setMessageList((list) => [...list, messageData])
    setMessage("")
  }

  useEffect(() => {
    socket.off("receive_message").on("receive_message", (msg) => {
      setMessageList((list) => [...list, msg])
    })
  }, [socket])

  return (
    <form onSubmit={(e) => e.preventDefault()} className='chat-window'>
      <h2>Welcome <code><b>{isLogged}</b></code> to the chat</h2>
      <div className="chat-header">
        <h4><span></span>Live {userCount}</h4>
      </div>
      <div className="chat-body">
        <ScrollToBottom className='message-container'>
          {
            messageList.map((msg, index) => {
              return (
                <div className='message' id={isLogged === msg.username ? "you" : "other"} key={index}>
                  <div>
                    <p id='author'>{msg.username}</p>
                    <div className="message-content">
                      <p>{msg.message}</p>
                    </div>
                    <div className="message-meta">
                      <p id='time'>{msg.date}</p>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </ScrollToBottom>
      </div>
      <div className="chat-footer d-flex">
        <textarea onChange={(e) => setMessage(e.target.value)} className='form-control me-2' style={{resize: "none"}} value={message} placeholder='message'></textarea>
        <input onClick={sendMessage} className='btn btn-info m-auto' type="submit" value="Send" />
      </div>
    </form>
  )
}

export default Chat