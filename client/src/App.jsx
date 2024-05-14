import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import {Routes, Route, NavLink} from 'react-router-dom'
import Chat from './components/Chat'
import Login from './components/Login'
import Register from './components/Register'
import { useState } from 'react'

function App() {
  const dynamicLink = (data) => (data.isActive ? 'nav-link active' : 'nav-link')
  const [loggedUser, setLoggedUser] = useState(null)

  return (
    <>
    <nav className='nav justify-content-center bg-warning py-2' style={{fontWeight: 'bold'}}>
      <NavLink className={dynamicLink} to='/'>Chat</NavLink>
      <NavLink className={dynamicLink} to='/login'>Login</NavLink>
      <NavLink className={dynamicLink} to='/register'>Register</NavLink>
    </nav>
    <main className='container-fluid m-auto my-5 w-50 rounded border p-3' style={{background: "lightgray", fontWeight: "bold"}}>
      <Routes>
        <Route path='/' element={<Chat loggedUser={loggedUser} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </main>
    </>
  )
}

export default App
