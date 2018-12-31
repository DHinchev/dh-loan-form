import React, { Component } from 'react';

class DropdownField extends Component {

    render() {
    const {fieldLabel, fieldValue, fieldName, arrayOptions, fieldError, onChange} = this.props;

        return (
            <div className='input-field-container'>
            <p className='input-field-text'>{fieldLabel}</p>
            <select name={fieldName}
                    value={fieldValue}
                    className={`input-field dropdown ${fieldError.length > 0 ? 'error' : ''}`}
                    required
                    onChange={onChange}>
                <option></option>
                {arrayOptions.map((option, index) => {
                    return (
                        <option key={index}>{option} months</option>
                    );
                })}
            </select>
            <p className='input-filed-details'>12 months - 60 months</p>
            <p className='input-field-error-text'>{fieldError}</p>
        </div>
        )
    }
  }
  
  export default DropdownField;