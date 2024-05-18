import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import {Routes, Route, NavLink} from 'react-router-dom'
import { useState } from 'react'
import Chat from './components/Chat'
import Login from './components/Login'
import Register from './components/Register'
import Logout from './components/Logout'
import About from './components/About'

import io from 'socket.io-client'
const socket = io.connect("http://localhost:4000")

function App() {
  const dynamicLink = (e) => (e.isActive ? 'active' : '')
  const [isLogged, setIsLogged] = useState(null)

  const [userCount, setUserCount] = useState(0)
  socket.on("users", (users) => {
    setUserCount(users)
  })

  return (
    <>
    <nav className='nav justify-content-center bg-warning py-2' style={{fontWeight: 'bold'}}>
      <NavLink className={'nav-link ' + dynamicLink} to='/'>Chat</NavLink>
      {
        (isLogged) ? (
          <NavLink className={'nav-link text-danger ' + dynamicLink} to='/logout'>Logout</NavLink>
        ) : (
          <>
          <NavLink className={'nav-link ' + dynamicLink} to='/login'>Login</NavLink>
          <NavLink className={'nav-link ' + dynamicLink} to='/register'>Register</NavLink>
          </>
        )
      }
      <NavLink className={'nav-link ' + dynamicLink} to='/about'>About</NavLink>
    </nav>
    <main className='container-fluid m-auto my-5 w-50 rounded border p-3' style={{background: "lightgray", fontWeight: "bold"}}>
      <Routes>
        <Route path='/' element={<Chat isLogged={isLogged} socket={socket} userCount={userCount} />} />
        <Route path='/login' element={<Login setIsLogged={setIsLogged} socket={socket} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/logout' element={<Logout setIsLogged={setIsLogged} socket={socket} />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </main>
    </>
  )
}

export default App
