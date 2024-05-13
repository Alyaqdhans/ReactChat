import React from 'react'

function Login() {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h1>Login</h1>

      <label className='form-label' htmlFor="user">Username</label>
      <input className='form-control mb-3' type="text" placeholder='Username' id='user' />

      <label className='form-label' htmlFor="pass">Password</label>
      <input className='form-control mb-3' type="password" placeholder='Password' id='pass' />

      <div className='text-center mt-3'>
        <input className='btn btn-info me-3' type="submit" value="Login" />
        <input className='btn btn-info' type="reset" value="Clear" />
      </div>
    </form>
  )
}

export default Login