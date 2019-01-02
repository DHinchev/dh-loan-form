import React, { Component } from 'react';

class DropdownField extends Component {

    state = {
        validating: false
    };
 
    static className = 'input-field';
    static defaultProps = {
        required: true,
        onBlur: () => {},
        onFocus: () => {},
    };
 
    validate = (cb) => {
        this.setState({ validating: true }, cb);
    }
 
    invalidate = (cb) => {
        this.setState({ validating: false }, cb);
    }
 
    handleBlur = ({ target }) => {
        const { value, name } = target;
 
        this.validate(() => {
           this.props.onBlur(value, name);
       });
    }
 
    handleFocus = ({ target }) => {
        const { value, name } = target;
 
        this.invalidate(() => {
            this.props.onFocus(value, name);
        });
    }
 
    hasErrors = (errors) => {
        return errors.length > 0;
    }

    render() {
        const {
            fieldLabel,
            fieldValue,
            fieldName,
            arrayOptions,
            fieldError,
            fieldDetails,
            onChange,
            required
        } = this.props;
    
        const { validating } = this.state;
 
        const className = this.hasErrors(fieldError)
            ? `${DropdownField.className} error`
            : DropdownField.className;

        return (
            <div className="input-field-container">
            <p className="input-field-text">{fieldLabel}</p>
            <select name={fieldName}
                    value={fieldValue}
                    className={className}
                    onChange={onChange}
                    onBlur={this.handleBlur}
                    onFocus={this.handleFocus}
                    required={required}>
                <option></option>
                {arrayOptions.map((option, index) => {
                    return (
                        <option key={index+1}>{option} months</option>
                    );
                })}
            </select>
            <p className="input-field-details">{fieldDetails}</p>
            {
                (validating)
                    ? <p className='input-field-error-text'>{fieldError}</p>
                    : null
            }
        </div>
        )
    }
  }
  
  export default DropdownField;