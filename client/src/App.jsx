import 'bootstrap/dist/css/bootstrap.css'
import {Routes, Route, Link} from 'react-router-dom'
import Chat from './components/Chat'
import Login from './components/Login'
import Register from './components/Register'

function App() {

  return (
    <>
    <nav className='nav justify-content-center'>
      <Link className='nav-link' to='/'>Chat</Link>
      <Link className='nav-link' to='/login'>Login</Link>
      <Link className='nav-link' to='/register'>Register</Link>
    </nav>
    <main className='container-fluid m-auto my-5 w-50 rounded border p-3' style={{background: "lightgray"}}>
      <Routes>
        <Route path='/' element={<Chat />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </main>
    </>
  )
}

export default App
