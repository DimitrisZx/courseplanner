import React, { useState } from 'react';
import fields from './formFields';
import { validators } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { requestProfileEdit, selectLocalId } from '../../features/store/stateSlice'
import { useHistory } from 'react-router-dom';

export default function EditProfileForm() {
  const dispatch = useDispatch()
  const history = useHistory();
  const [formFields, setFormFields] = useState({name: '', rn: '', semester: ''});
  const localId = useSelector(selectLocalId);

  const validateField = (field) => {
    return validators[field.name](field.value)
  }
  validateField({name: 'name', value: "Asf ssdg"})

  const handleChange = e => {
    setFormFields({...formFields, [e.target.name]: e.target.value })
  }

  const handleClick = e => {
    e.preventDefault();
    dispatch(requestProfileEdit({...formFields, localId}))
  }
   
  const validForm = Object.values(formFields).every(field => field !== '')
  return (
    <div className='container'>
      <div className="row">
        <div className="col-md-12">
          <form>
            {fields.map(({ value, type, label }) =>
              <div className="form-group" key={value}>
                <label htmlFor={value}>{label}</label>
                <input 
                  value={formFields[value]}
                  onChange={e => handleChange(e)} 
                  className={'form-control'} 
                  type={type} 
                  name={value} 
                  id={value} />
              </div>
            )}
            <button
              disabled={!validForm}
              id={'login'}  
              onClick={e => handleClick(e)} 
              className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}
