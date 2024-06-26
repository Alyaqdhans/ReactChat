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
      setResponse("There are empty fields")
      setColor("alert-danger")
      return
    }

    // make sure user password is correct
    if (pass !== pass2) {
      setResponse("Passwords don't match")
      setColor("alert-danger")
      return
    }

    Axios.get(`http://localhost:4000/getUser/${user}`)
    .then((response) => {
      // check if user exists and not taken
      if (response.data) {
        setResponse("Username is taken")
        setColor("alert-danger")
      } else {
        // register the user
        Axios.post(`http://localhost:4000/addUser`, {
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
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h1>Register</h1>

      <label className='form-label' htmlFor="user">Username</label>
      <input onChange={(e) => setUser(e.target.value.trim().toLowerCase())} className='form-control mb-3' type="text" placeholder='Username' id='user' />

      <label className='form-label' htmlFor="pass">Password</label>
      <input onChange={(e) => setPass(e.target.value)} className='form-control mb-3' type="password" placeholder='Password' id='pass' />

      <label className='form-label' htmlFor="pass2">Confirm Password</label>
      <input onChange={(e) => setPass2(e.target.value)} className='form-control mb-3' type="password" placeholder='Password' id='pass2' />

      <input onClick={handleRegister} className='btn btn-info me-3 mt-3' type="submit" value="Register" />
      <input className='btn btn-info mt-3' type="reset" value="Clear" />

      {
        (response) ? (
          <>
          <hr style={{borderWidth: "3px"}} />
          <Alert text={response} color={color} />
          </>
        ) : (
          <></>
        )
      }
    </form>
  )
}

export default Register