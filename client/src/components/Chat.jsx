import React, { useEffect, useRef, useState } from 'react'
import Alert from './Alert'
import moment from 'moment-timezone'
import Axios from 'axios'

function Chat({isLogged, socket, chatCount}) {
  if (isLogged === null) 
    return <Alert text='Login before acccessing the chat!' color='alert-warning' />

  const [message, setMessage] = useState("")
  const [currentChars, setCurrentChars] = useState(0)
  const maxChars = 100
  const handleMessage = (e) => {
    if (e.target.value.length > maxChars) return

    setMessage(e.target.value)
    setCurrentChars(e.target.value.length)
  }

  let [messageList, setMessageList] = useState([])

  const date = moment.tz(new Date(Date.now()), "Asia/Muscat").format('D/M/Y h:mm A')
  const sendMessage = () => {
    if (!message || !message.trim()) return

    // delete input data
    setMessage("")
    setCurrentChars(0)

    // store message in database
    Axios.post(`http://localhost:4000/storeMessage`, {
      username: isLogged,
      text: message,
      date: date,
      edited: false,
      lastEdited: date
    })
    .then((response) => {
      console.log("Message saved successfully")
      // live send to clients with the new _id
      socket.emit("send_message", response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const deleteMessage = (_id) => {
    if (!window.confirm("Are you sure you want to delete?")) return

    // delete message from database
    Axios.delete(`http://localhost:4000/deleteMessage/${_id}`)
    .then((response) => {
      console.log(response.data)
      // live delete from clients
      socket.emit("delete_message", _id)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  // switching main input to edit mode
  const [edit, setEdit] = useState(false)
  const [editMsg, setEditMsg] = useState()
  const editMode = (msg) => {
    setEdit(true)
    setMessage(msg.text)
    setCurrentChars(msg.text.length)
    setEditMsg(msg)
  }

  // restoring main input to default
  const restoreEditMode = () => {
    setEdit(false)
    setMessage("")
    setCurrentChars(0)
    setEditMsg(null)
  }

  const editMessage = () => {
    if (!message || !message.trim()) return

    // delete input data
    restoreEditMode()

    // edit message from database
    Axios.put(`http://localhost:4000/editMessage/${editMsg._id}`, {
      text: message,
      edited: true,
      lastEdited: date
    })
    .then((response) => {
      console.log(response.data)
      // alter the edited message
      messageList.filter((msg) => {
        if (msg._id === editMsg._id) {
          msg.edited = true
          msg.text = message
          msg.lastEdited = date
        }
      })
      // live edit from clients
      socket.emit("edit_message", messageList)
    })
    .catch((error) => {
      console.log(error);
    })
  }

  // live add the new message
  socket.on("sending_message", (msg) => {
    setMessageList([...messageList, msg])
  })

  // live remove deleted message
  socket.on("deleting_message", (_id) => {
    setMessageList([...messageList.filter((msg) => {return msg._id !== _id})])
  })

  // live change edited message
  socket.on("editing_message", (msgList) => {
    setMessageList(msgList)
  })

  useEffect(() => {
    // clear current list to avoid duplicates
    setMessageList([])

    // get previous messages from database
    Axios.get(`http://localhost:4000/retrieveMessages`)
    .then((response) => {
      response.data.msgs.map((msg) => {
        setMessageList((list) => [...list, msg])
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  // auto scroll handler
  const [autoScroll, setAutoScroll] = useState(true)
  const handleAutoScroll = () => {
    setAutoScroll(!autoScroll)
  }

  const bottom = useRef(null)
  useEffect(() => {
    if (!autoScroll) return

    bottom.current.scrollIntoView()
  }, [messageList])

  return (
    <form onSubmit={(e) => e.preventDefault()} className='chat-window'>
      <div id='chat-top'>
        <h2 className='m-0'>Welcome <code><b>{isLogged}</b></code></h2> <h2>to the chat</h2>
        <div className="chat-header" style={{minWidth: "101px"}}>
          <h4><span></span>{chatCount} Live</h4>
        </div>
      </div>
      <div className="chat-body">
          {
            messageList?.map((msg, index) => {
              return (
                <div className='message' id={isLogged === msg.username ? "you" : "other"} key={index}>
                  <div>
                    <p id='author'>{msg.username}</p>
                    <div className="message-content">
                      <p className={msg.text.length === 2 ? 'h2 pb-1' : ''}>{msg.text}</p>
                    </div>
                    <div id='modify' className='d-flex'>
                      <input className={'btn btn-danger ms-1 ' + (isLogged !== msg.username ? "d-none" : "")} onClick={() => deleteMessage(msg._id)} type="button" value='delete' />
                      <input className={'btn btn-warning ' + (isLogged !== msg.username ? "d-none" : "")} onClick={() => editMode(msg)} type="button" value='edit' />
                    </div>
                    <div className="message-meta">
                      <p id='time'>{msg.date} {msg.edited ? (<span title={msg.lastEdited}>(edited)</span>) : ""}</p>
                    </div>
                  </div>
                </div>
              )
            })
          }
          <div id='bottom' ref={bottom}><input onClick={handleAutoScroll} type='button' className={'btn ' + (autoScroll ? 'btn-success' : 'btn-danger')} /></div>
      </div>
      <div className="chat-footer d-flex">
        <input onChange={(e) => handleMessage(e)} className='form-control me-2 mb-1 pb-3' style={{fontWeight: "bold"}} type='text' value={message} placeholder='message' />
        <p>{currentChars}/{maxChars}</p>
        {
          (edit) ? (
            <>
            <input onClick={restoreEditMode} className='btn btn-danger m-auto me-1' type="button" value="Cancel" />
            <input onClick={editMessage} className='btn btn-warning m-auto' type="submit" value="Save" />
            </>
          ) : (
            <input onClick={sendMessage} className='btn btn-info m-auto' type="submit" value="Send" />
          )
        }
      </div>
    </form>
  )
}

export default Chat