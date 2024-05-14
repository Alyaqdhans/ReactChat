import React, { useState } from 'react'
import Axios from 'axios'
import Alert from './Alert'

function Login() {
  const [user, setUser] = useState()
  const [pass, setPass] = useState()
  const [response, setResponse] = useState()

  const handleLogin = () => {
    // check if fields are empty
    if (!(user && pass)) {
      setResponse("Some fields are empty")
      return
    }

    Axios.get(`http://localhost:4000/loginUser/${user}`)
    .then((response) => {
      setResponse(response.data.user[0].username)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h1>Login</h1>

      <label className='form-label' htmlFor="user">Username</label>
      <input onChange={(e) => setUser(e.target.value)} className='form-control mb-3' type="text" placeholder='Username' id='user' />

      <label className='form-label' htmlFor="pass">Password</label>
      <input onChange={(e) => setPass(e.target.value)} className='form-control mb-3' type="password" placeholder='Password' id='pass' />

      <div className='text-center my-3'>
        <input onClick={handleLogin} className='btn btn-info me-3' type="submit" value="Login" />
        <input className='btn btn-info' type="reset" value="Clear" />
      </div>

      {
        (response) ? (
          <Alert text={response} color={'alert-danger'} />
        ) : (
          <></>
        )
      }
    </form>
  )
}

export default Login