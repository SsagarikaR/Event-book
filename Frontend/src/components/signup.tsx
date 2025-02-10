import React from 'react'

function Signup() {
  return (
    <div className='signin-form'>
    <h1>Sign Up</h1>
  <div className='input-container'>
    <label>Enter your Name</label>
    <input className='input-box'type='text'/>
  </div>
  <div className='input-container'>
    <label>Enter your Email</label>
    <input className='input-box' type='text'/>
  </div>
  <div className='input-container'>
    <label>Enter your Password</label>
    <input className='input-box' type='password'/>
  </div>
  <button className='submit'>submit</button>
</div>
  )
}

export default Signup
