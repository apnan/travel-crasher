import React from 'react'

export default function Login() {
    return (
      <div className="login-wrapper">
        <h1>Please Log In</h1>
        <form>
          <label>
            <p>UserName</p>
            <input type="text" />
          </label>
          <label>
            <p>Password</p>
            <input type="password" />
          </label>
          <div>
            <button type="submit">submit</button>
          </div>
        </form>
        <div className="register-text">
          <p>
            Not a user? Register <a href="register">Here</a>
          </p>
        </div>
      </div>
    );
}
