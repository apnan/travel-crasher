import React from 'react';
import { useState } from 'react';
import LoginValidation from './LoginValidation';
import './login.css';
import { useNavigate } from 'react-router-dom';
// import { updateLoggedIn } from "./context/ProtectedRoutes";
import { updateLoggedIn } from '../../components/context/ProtectedRoutes';
import { toLoggeIn } from '../../store/userSlices';
import { useDispatch } from 'react-redux';

const Login = ({ handleLogin }) => {
  const dispatch = useDispatch();

  const initState = {
    userName: '',
    password: '',
  };

  const navigate = useNavigate();

  const [user, setUser] = useState(initState);
  const [errors, setErrors] = useState({});

  async function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = LoginValidation(user);

    setErrors(validationErrors);

    if (validationErrors.hasErrors) {
      return;
    }

    //User rest endpoint to post user
    const response = await fetch(
      'https://grupp-3-backend.herokuapp.com/api/users/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        setErrors({ error: 'Please register if you are already not a user' });
      } else {
        setErrors({ error: 'Something went wrong' });
      }
    }

    if (response.ok) {
      const body = await response.json();
      if (body.length !== 0) {
        /* updateLoggedIn(); */
        navigate('/profile');
        dispatch(toLoggeIn());
      } else {
        setErrors({ error: 'No user found....' });
      }
    }

    setUser(initState);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div className="content">
      <form id="login_form" className="login-form">
        <h1>Login</h1>

        {errors.error && <p className="error">{errors.error}</p>}

        {errors.userName && <p className="error">{errors.userName}</p>}
        <div className="form_div">
          <label>username:</label>
          <input
            className="input-text"
            name="userName"
            type="text"
            value={user.userName}
            onChange={handleChange}
          />

          {errors.password && <p className="error">{errors.password}</p>}
          <label>Password:</label>
          <input
            id="pass"
            className="input-text"
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
          />

          <button
            className="submit-btn"
            type="submit"
            form="login_form"
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>

        <div className="register-text">
          <p>
            Not a user? Register <a href="signin">Here</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
