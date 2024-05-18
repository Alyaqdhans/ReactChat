import React, { useEffect, useRef, useState } from 'react'
import Alert from './Alert'
import moment from 'moment-timezone'
import Axios from 'axios'

function Chat({isLogged, socket, userCount}) {
  if (isLogged === null) 
    return <Alert text='Login before acccessing the chat!' color='alert-warning' />

  const [message, setMessage] = useState("")
  let [messageList, setMessageList] = useState([])

  const date = moment.tz(new Date(Date.now()), "Asia/Muscat")
  const sendMessage = () => {
    if (!message || !message.trim()) return

    // store message in database
    Axios.post(`http://localhost:4000/storeMessage`, {
      username: isLogged,
      text: message,
      date: date.format('D/M/Y h:m A'),
      edited: false,
      lastEdited: date.format('D/M/Y h:m A')
    })
    .then((response) => {
      console.log("Message saved successfully")
      // live send to clients with the new _id
      socket.emit("send_message", response.data)
      setMessage("")
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
    setEditMsg(msg)
  }

  // restoring main input to default
  const restoreEditMode = () => {
    setEdit(false)
    setMessage("")
    setEditMsg(null)
  }

  const editMessage = () => {
    if (!message || !message.trim()) return

    // edit message from database
    Axios.put(`http://localhost:4000/editMessage/${editMsg._id}`, {
      text: message,
      edited: true,
      lastEdited: date.format('D/M/Y h:m A')
    })
    .then((response) => {
      console.log(response.data)
      // alter the edited message
      messageList.filter((msg) => {
        if (msg._id === editMsg._id) {
          msg.edited = true
          msg.text = message
          msg.lastEdited = date.format('D/M/Y h:m A')
        }
      })
      // live edit from clients
      socket.emit("edit_message", messageList)
    })
    .catch((error) => {
      console.log(error);
    })

    restoreEditMode()
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
        <input onChange={(e) => setMessage(e.target.value)} className='form-control me-2' type='text' value={message} placeholder='message' />
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