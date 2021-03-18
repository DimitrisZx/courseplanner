import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestLogin, requestSignUp, selectIsLoggedIn, selectAvailableSchoolNames, getSchoolNames, selectErrors, clearErrors } from '../../features/store/stateSlice'
import fields from './formFields';
import { useHistory } from 'react-router-dom';
import Dropdown from './dropdown';
import { useNetwork } from '../../useNetwork';

const LoginForm = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [registryNumber, setRn] = useState("");
  const [semester, setSemester] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [schoolCode, setSchoolCode] = useState("");
  const fieldStates = { email, password, name, registryNumber, semester };
  const dispatch = useDispatch();
  const userLoggedIn = useSelector(selectIsLoggedIn);
  const schoolsMap = useSelector(selectAvailableSchoolNames)
  const schoolNames = schoolsMap.map(obj => obj.schoolName);
  const errors = useSelector(selectErrors);

  const isOffline = !useNetwork();
  console.log(isOffline)

  if (userLoggedIn) history.push("/my-schedule");
  // dispatch(requestLogin({ email: 'myemail@eg.gr', password: '1234', history, registryNumber: '14024' }))
  function handleClick(e) {
    e.preventDefault();
    if (!(email && password)) return;
    console.log(email, password, name, registryNumber, semester, schoolCode)
    if(isLogin) {
      dispatch(requestLogin({ email, password, history, registryNumber }))
    } else {
      dispatch(requestSignUp({ email, password, name, registryNumber, semester, history, schoolCode }))
    }
  };
  function mapSchooNameToCode(schoolName) {
    
    const code = schoolsMap.find(item => item['schoolName'] === schoolName ).schoolCode;
    console.log(code)
    
    setSchoolCode(code);
  }
  function handleChange(e) {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "name":
        setName(e.target.value);
        break;
      case "registryNumber":
        setRn(e.target.value);
        break;
      case "semester":
        setSemester(e.target.value);
        break;
      default:
        break;
    }
  }
  function handleClear(e) {
    e.preventDefault();
    dispatch(clearErrors())
  }
  function handleSetLogin(e, bool) {
    e.preventDefault();
    handleClear(e);
    isLogin
     ? [ setEmail, setPassword ].forEach(fn => fn(''))
     : [ setEmail, setPassword, setName, setRn, setSemester ].forEach(fn => fn(""))
    setIsLogin(bool);
    isLogin && dispatch( getSchoolNames() );
  }
  const filterLoginFields = field => isLogin ? [ "password", "email" ].includes(field.name) : true;
  
  const userNamePasswordFilled = !( email && password );
  const allFieldsFilled = !( email && password && name && registryNumber && semester && schoolCode );
  
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
            <h3 className="text-dark">{isLogin ? 'Είσοδος' : 'Εγγραφή'}{isOffline && ' - Είστε εκτός σύνδεσης'}</h3>
            <hr></hr>
            {fields.filter(filterLoginFields).map(({ name, type, label, value }) =>
              <div className="form-group" key={name}>
                <label htmlFor={name}>{label}</label>
                <input
                  disabled={isOffline}
                  onChange={handleChange}
                  value={fieldStates[name]}
                  className="form-control"
                  type={type}
                  name={name}
                  id={name} />
              </div>
            )}
            {!isLogin && <Dropdown namesList={schoolNames} label={"Επιλογή Σχολής"} setterFunction={mapSchooNameToCode} /> }
            <div className="buttons d-flex justify-content-end mt-3">
              <button  
                id={ isOffline && isLogin ? 'login' : 'sign-Up'} 
                disabled={
                  !isOffline &&
                  isLogin
                    ? userNamePasswordFilled
                    : allFieldsFilled
                } 
                onClick={handleClick} 
                className={
                  `btn btn-${mainButtonColor} cursor-pointer`}>{isLogin ? 'Σύνδεση' : 'Εγγραφή'}
              </button>
                <button
                  className="btn btn-warning ml-2" 
                  onClick={(e) => handleSetLogin(e,!isLogin)}
                  disabled={isOffline}>
                Αλλαγή σε { isLogin ? 'Εγγραφή' : 'Σύνδεση'}
                </button>
                {errors.length > 0 && 
                  <button className="btn btn-primary ml-2" 
                  onClick={(e) => handleClear(e)}>Καθαρισμός</button>
                }
            </div>
          </form>
          { errors.length > 0 && errors.map(error => <div className="alert alert-danger mt-3" role='alert'>{error}</div>)   }
        </div>
      </div>
    </div>
  )
}

export default LoginForm;