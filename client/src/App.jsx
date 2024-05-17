import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import {Routes, Route, NavLink} from 'react-router-dom'
import { useState } from 'react'
import Chat from './components/Chat'
import Login from './components/Login'
import Register from './components/Register'
import Logout from './components/Logout'
import About from './components/About'

function App() {
  const dynamicLink = (e) => (e.isActive ? 'active' : '')
  const [isLogged, setIsLogged] = useState(null)

  return (
    <>
    <nav className='nav justify-content-center bg-warning py-2' style={{fontWeight: 'bold'}}>
      <NavLink className={'nav-link ' + dynamicLink} to='/'>Chat</NavLink>
      {
        (isLogged) ? (
          <NavLink className={'nav-link ' + dynamicLink} to='/logout'>Logout</NavLink>
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
        <Route path='/' element={<Chat isLogged={isLogged} />} />
        <Route path='/login' element={<Login setIsLogged={setIsLogged} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/logout' element={<Logout setIsLogged={setIsLogged} />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </main>
    </>
  )
}

export default App
