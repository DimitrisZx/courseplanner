import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestLogin, requestSignUp, selectIsLoggedIn } from '../../features/store/stateSlice'
import fields from './formFields';
import { useHistory } from 'react-router-dom';

const LoginForm = () => {
  const history = useHistory();
  const [email, setEmail] = useState('asd@asdb.gr');
  const [password, setPassword] = useState('123456');
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const userLoggedIn = useSelector(selectIsLoggedIn);
  if(userLoggedIn) history.push('/my-schedule')
  const handleClick = e => {
    e.preventDefault();
    if (!(email && password)) return;

    if(isLogin) {
      dispatch(requestLogin({ email, password, history }))
    } else {
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
            <button 
              style={{ cursor: 'pointer' }} 
              id={isLogin ? 'login' : 'sign-Up'} 
              disabled={!(email && password)} 
              onClick={handleClick} 
              className="btn btn-primary">{isLogin ? 'Login' : 'Sign Up'}</button>
              <p onClick={() => setIsLogin(!isLogin)}>Switch to {isLogin ? 'Sign Up' : 'Login'}</p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginForm;