import React, { Component } from 'react';
 
class InputField extends Component {
    state = {
        validating: false
    };
 
    static className = 'input-field';
    static defaultProps = {
        placeholder: 'Start typing...',
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
            fieldDetails,
            fieldError,
            onChange,
            placeholder,
            required,
        } = this.props;
 
        const { validating } = this.state;
 
        const className = this.hasErrors(fieldError)
            ? `${InputField.className} error`
            : InputField.className;
 
        return (
            <div className="input-field-container">
                <p className="input-field-text">{fieldLabel}</p>
                <input
                    type="text"
                    placeholder={placeholder}
                    name={fieldName}
                    className={className}
                    value={fieldValue}
                    onChange={onChange}
                    onBlur={this.handleBlur}
                    onFocus={this.handleFocus}
                    required={required}
                />
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
 
export default InputField;