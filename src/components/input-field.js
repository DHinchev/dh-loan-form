import React, { Component } from 'react';
import InputFieldDetails from './input-field-details';

class InputField extends Component {

    constructor() {
        super();
        this.state = {
            validating: false
        }
    }

    handleBlur = () => {
        this.setState({validating: true});
    }

    handleFocus = () => {
        this.setState({validating: false});
    }

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
                    onBlur={this.handleBlur}
                    onFocus={this.handleFocus}
                    autoComplete={"off"}
                    required/>
                <InputFieldDetails fieldDetails={fieldDetails} />
                {this.state.validating ? <p className='input-field-error-text'>{fieldError}</p> : null }
            </div>
        )
    }
  }
  
  export default InputField;