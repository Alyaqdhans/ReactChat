import React, { useState } from 'react'
import Axios from 'axios'
import Alert from './Alert'
import { useNavigate } from 'react-router-dom'

function Login(props) {
  const [user, setUser] = useState()
  const [pass, setPass] = useState()
  const [response, setResponse] = useState()
  const navigate = useNavigate()

  const handleLogin = () => {
    // check if fields are empty
    if (!(user && pass)) {
      setResponse("There are empty fields")
      return
    }

    Axios.get(`http://localhost:4000/getUser/${user}`)
    .then((response) => {
      // check if username exists
      if (!response.data)
        return setResponse("Username doesn't exist")

      // check if password is correct
      if (response.data.password !== pass)
        return setResponse("Incorrect password")

      // login the user
      props.socket.emit("join")
      props.setIsLogged(response.data.username)
      navigate('/')
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h1>Login</h1>

      <label className='form-label' htmlFor="user">Username</label>
      <input onChange={(e) => setUser(e.target.value.trim().toLowerCase())} className='form-control mb-3' type="text" placeholder='Username' id='user' />

      <label className='form-label' htmlFor="pass">Password</label>
      <input onChange={(e) => setPass(e.target.value)} className='form-control mb-3' type="password" placeholder='Password' id='pass' />

      <input onClick={handleLogin} className='btn btn-info me-3 mt-3' type="submit" value="Login" />
      <input className='btn btn-info mt-3' type="reset" value="Clear" />

      {
        (response) ? (
          <>
          <hr style={{borderWidth: "3px"}} />
          <Alert text={response} />
          </>
        ) : (
          <></>
        )
      }
    </form>
  )
}

export default Login