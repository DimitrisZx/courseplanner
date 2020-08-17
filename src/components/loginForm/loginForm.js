import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestLogin, requestSignUp } from '../../features/counter/counterSlice'
import fields from './formFields';
import { useHistory } from 'react-router-dom';

const LoginForm = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleClick = e => {
    e.preventDefault();
    if (!(email && password)) return;
    if(e.target.id === 'login') {
      dispatch(requestLogin({ email, password, history }))
    } else if (e.target.id === 'sign-up') {
      dispatch(requestSignUp({ email, password, history }))
    }
  };
  
  const handleChange = ({ target: { value, name: inputName } }) => {
    switch (inputName) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  }

  return (
    <div className='container'>
      <div className="row">
        <div className="col-md-12">
          <form>
            {fields.map(({ value, type, label }) =>
              <div className="form-group" key={value}>
                <label htmlFor={value}>{label}</label>
                <input onChange={handleChange} value={value === 'email' ? email : password} className='form-control' type={type} name={value} id={value} />
              </div>
            )}
            <button style={{ cursor: 'pointer' }} id={'login'} disabled={!(email && password)} onClick={handleClick} className="btn btn-primary">Login</button>
            <button style={{ cursor: 'pointer' }} id={'sign-up'} disabled={!(email && password)} onClick={handleClick} className="btn btn-success">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginForm;