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
      if (!response.data.user[0])
        return setResponse("Username doesn't exist")

      // check if password is correct
      if (response.data.user[0].password !== pass)
        return setResponse("Incorrect password")

      // login the user
      props.setIsLogged(response.data.user[0].username)
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
      <input onChange={(e) => setUser(e.target.value)} className='form-control mb-3' type="text" placeholder='Username' id='user' />

      <label className='form-label' htmlFor="pass">Password</label>
      <input onChange={(e) => setPass(e.target.value)} className='form-control mb-3' type="password" placeholder='Password' id='pass' />

      <div className='text-center my-3'>
        <input onClick={handleLogin} className='btn btn-info me-3' type="submit" value="Login" />
        <input className='btn btn-info' type="reset" value="Clear" />
      </div>

      {
        (response) ? (
          <Alert text={response} />
        ) : (
          <></>
        )
      }
    </form>
  )
}

export default Login