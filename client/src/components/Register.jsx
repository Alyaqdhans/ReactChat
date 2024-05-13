import React from 'react'

function Register() {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h1>Register</h1>

      <label className='form-label' htmlFor="username">Username</label>
      <input className='form-control mb-3' type="text" placeholder='Username' id='username' />

      <label className='form-label' htmlFor="password">Password</label>
      <input className='form-control mb-3' type="password" placeholder='Password' id='password' />

      <label className='form-label' htmlFor="password2">Confirm Password</label>
      <input className='form-control mb-3' type="password" placeholder='Password' id='password2' />

      <div className='text-center'>
        <input className='btn btn-info me-3' type="submit" value="Login" />
        <input className='btn btn-info' type="reset" value="Clear" />
      </div>
    </form>
  )
}

export default Register