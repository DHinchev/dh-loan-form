import React, { Component } from 'react';
 
class InputField extends Component {
    state = {
        validating: false
    };
 
    static className = 'input-field';
    static defaultProps = {
        placeholder: 'Start typing...',
        required: true
    };
 
    validate = () => {
        this.setState({ validating: true });
    }
 
    invalidate = () => {
        this.setState({ validating: false });
    }
 
    handleBlur = () => {
       this.validate();
    }
 
    handleFocus = () => {
        this.invalidate();
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
                <p className="input-fieled-details">{fieldDetails}</p>
                {
                    (validating)
                        ? <p className="input-field-error-text">{fieldError}</p>
                        : null
                }
            </div>
        )
    }
}
 
export default InputField;