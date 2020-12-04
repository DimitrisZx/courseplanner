import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestLogin, requestSignUp, selectIsLoggedIn } from '../../features/store/stateSlice'
import fields from './formFields';
import { useHistory } from 'react-router-dom';

const LoginForm = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [registryNumber, setRn] = useState('');
  const [semester, setSemester] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const fieldStates = {email,password,name,registryNumber,semester}
  const dispatch = useDispatch();
  const userLoggedIn = useSelector(selectIsLoggedIn);

  if (userLoggedIn) history.push('/my-schedule')

  function handleClick(e) {
    e.preventDefault();
    if (!(email && password)) return;
    console.log(email, password, name, registryNumber, semester)
    if(isLogin) {
      dispatch(requestLogin({ email, password, history, registryNumber }))
    } else {
      dispatch(requestSignUp({ email, password, name, registryNumber, semester, history }))
    }
  };
  
  function handleChange(e) {
    console.log(e)
    switch (e.target.name) {
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      case 'name':
        setName(e.target.value);
        break;
      case 'registryNumber':
        setRn(e.target.value);
        break;
      case 'semester':
        setSemester(e.target.value);
        break;
      default:
        break;
    }
  }

  function handleSetLogin(e, bool) {
    e.preventDefault();
    isLogin
     ? [setEmail,setPassword].forEach(fn => fn(''))
     : [setEmail,setPassword,setName,setRn,setSemester].forEach(fn => fn(''))
    setIsLogin(bool);
  }
  const filterLoginFields = field => isLogin ? ['password','email'].includes(field.name) : true;
  
  const userNamePasswordFilled = !(email && password)
  const allFieldsFilled = !(email && password && name && registryNumber && semester )
  
  const mainButtonColor =
    isLogin
      ? userNamePasswordFilled 
        ? 'light' 
        : 'success'
      : allFieldsFilled 
        ? 'light' 
        : 'success';

  return (
    <div className='container'>
      <div className="row d-flex justify-content-center mt-5">
        <div className={`col-md-6 bg-white shadow-sm border border-${mainButtonColor} pt-2 pb-3 rounded`}>
          <form>
            <h3 className="text-dark">{isLogin ? 'Είσοδος' : 'Εγγραφή'}</h3>
            <hr></hr>
            {fields.filter(filterLoginFields).map(({ name, type, label, value }) =>
              <div className="form-group" key={name}>
                <label htmlFor={name}>{label}</label>
                <input
                  onChange={handleChange}
                  value={fieldStates[name]}
                  className='form-control'
                  type={type}
                  name={name}
                  id={name} />
              </div>
            )}
            <div className="buttons d-flex justify-content-end">
              <button 
                style={{ cursor: 'pointer' }} 
                id={isLogin ? 'login' : 'sign-Up'} 
                disabled={
                  isLogin
                    ? userNamePasswordFilled
                    : allFieldsFilled
                } 
                onClick={handleClick} 
                className={
                  `btn btn-${mainButtonColor}`}>{isLogin ? 'Login' : 'Sign Up'}
              </button>
                <button
                  className="btn btn-warning ml-2" 
                  onClick={(e) => handleSetLogin(e,!isLogin)}>
                Switch to {isLogin ? 'Sign Up' : 'Login'}
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginForm;