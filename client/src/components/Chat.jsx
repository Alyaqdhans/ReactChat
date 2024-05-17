import React, { useEffect, useRef, useState } from 'react'
import Alert from './Alert'
import moment from 'moment-timezone'
import Axios from 'axios'

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
      text: message,
      date: date.format('D/M/Y h:m A'),
      edited: false,
      lastEdited: date.format('D/M/Y h:m A')
    }

    // live send to clients
    await socket.emit("send_message", messageData)
    setMessageList((list) => [...list, messageData])
    setMessage("")

    // store message in database
    Axios.post(`http://localhost:4000/storeMessage`, {
      username: isLogged,
      text: message,
      date: date.format('D/M/Y h:m A'),
      edited: false,
      lastEdited: date.format('D/M/Y h:m A')
    })
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const deleteMessage = async (_id) => {
    if (!window.confirm("Are you sure you want to delete?")) return

    // live delete from clients
    await socket.emit("delete_message", _id)
    setMessageList(messageList.filter((msg) => msg._id != _id))

    // delete message from database
    Axios.delete(`http://localhost:4000/deleteMessage/${_id}`)
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    // get live messages
    socket.off("receive_message").on("receive_message", (msg) => {
      setMessageList((list) => [...list, msg])
    })

    // get messages after delete
    socket.off("deleting_message").on("deleting_message", (_id) => {
      setMessageList(messageList.filter((msg) => msg._id != _id))
    })
  }, [socket])

  // get previous messages from database
  useEffect(() => {
    Axios.get(`http://localhost:4000/retreiveMessages`)
    .then((response) => {
      response.data.msgs.map((msg) => {
        setMessageList((list) => [...list, msg])
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  // auto scroll
  const bottom = useRef(null)
  useEffect(() => {
    bottom.current.scrollIntoView()
  }, [messageList])

  return (
    <form onSubmit={(e) => e.preventDefault()} className='chat-window'>
      <h2>Welcome <code><b>{isLogged}</b></code> to the chat</h2>
      <div className="chat-header">
        <h4><span></span>Live {userCount}</h4>
      </div>
      <div className="chat-body">
          {
            messageList?.map((msg, index) => {
              return (
                <div className='message' id={isLogged === msg.username ? "you" : "other"} key={index}>
                  <div>
                    <p id='author'>{msg.username}</p>
                    <div className="message-content">
                      <p>{msg.text}</p>
                    </div>
                    <input id='modify' className={'btn btn-danger ' + (isLogged !== msg.username ? "d-none" : "")} onClick={() => deleteMessage(msg._id)} type="button" value='delete' />
                    <div className="message-meta">
                      <p id='time'>{msg.date}</p>
                    </div>
                  </div>
                </div>
              )
            })
          }
          <div ref={bottom}></div>
      </div>
      <div className="chat-footer d-flex">
        <input onChange={(e) => setMessage(e.target.value)} className='form-control me-2' type='text' value={message} placeholder='message' />
        <input onClick={sendMessage} className='btn btn-info m-auto' type="submit" value="Send" />
      </div>
    </form>
  )
}

export default Chat