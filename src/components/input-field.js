import React, { Component } from 'react';
import InputFieldDetails from './input-field-details';

class InputField extends Component {

    render() {
    const {fieldLabel, fieldValue, fieldName, fieldDetails, fieldError, onChange} = this.props;

        return (
            <div className='input-field-container'>
                <p className='input-field-text'>{fieldLabel}</p>
                <input name={fieldName}
                    type='text'
                    className={`input-field ${fieldError.length > 0 ? 'error' : ''}`}
                    value={fieldValue}
                    placeholder='Start typing...'
                    onChange={onChange} 
                    required/>
                <InputFieldDetails fieldDetails={fieldDetails} />
                <p className='input-field-error-text'>{fieldError}</p>
            </div>
        )
    }
  }
  
  export default InputField;