import React, { useState } from 'react'
import Axios from 'axios'
import Alert from './Alert'

function Register() {
  const [user, setUser] = useState()
  const [pass, setPass] = useState()
  const [pass2, setPass2] = useState()
  const [response, setResponse] = useState()
  const [color, setColor] = useState()

  const handleRegister = () => {
    // check if fields are empty
    if (!(user && pass && pass2)) {
      setResponse("Some fields are empty")
      setColor("alert-danger")
      return
    }

    // make sure user password is correct
    if (pass !== pass2) {
      setResponse("Passwords doesn't match")
      setColor("alert-danger")
      return
    }

    Axios.post(`http://localhost:4000/registerUser`, {
      username: user,
      password: pass
    })
    .then((response) => {
      setResponse(response.data)
      setColor("alert-success")
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h1>Register</h1>

      <label className='form-label' htmlFor="user">Username</label>
      <input onChange={(e) => setUser(e.target.value)} className='form-control mb-3' type="text" placeholder='Username' id='user' />

      <label className='form-label' htmlFor="pass">Password</label>
      <input onChange={(e) => setPass(e.target.value)} className='form-control mb-3' type="password" placeholder='Password' id='pass' />

      <label className='form-label' htmlFor="pass2">Confirm Password</label>
      <input onChange={(e) => setPass2(e.target.value)} className='form-control mb-3' type="password" placeholder='Password' id='pass2' />

      <div className='text-center my-3'>
        <input onClick={handleRegister} className='btn btn-info me-3' type="submit" value="Register" />
        <input className='btn btn-info' type="reset" value="Clear" />
      </div>

      {
        (response) ? (
          <Alert text={response} color={color} />
        ) : (
          <></>
        )
      }
    </form>
  )
}

export default Register