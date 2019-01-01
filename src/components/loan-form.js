import React, { Component } from 'react';
import Postcode from 'postcode-validator';
import ValidDate from 'is-valid-date';
import {withRouter} from 'react-router-dom';
import InputField from './input-field';
import DropdownField from './dropdown-field';
import FormConsentDetails from './form-consent-details';
import FormHead from './form-head';
import Data from '../assets/data/data.json';
import '../styles/form-component/loan-form.scss';
 
const isString = (value) => (typeof value) === 'string';
 
const checkEmailValidity = RegExp(
    // eslint-disable-next-line
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
 
const checkNameValidity = RegExp(
    // eslint-disable-next-line
    /^[a-z ,.'-]+$/i
);
 
const checkMoneyValidity = RegExp(
    // eslint-disable-next-line
    /^[0-9]+(\.[0-9]{1,2})?$/
);
 
const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
 
    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
      val.length > 0 && (valid = false);
    });
 
    // validate the form was filled out
    Object.values(rest).forEach(val => {
      val === null && (valid = false);
    });
 
    return valid;
};
 
class LoanForm extends Component {
    state = {
        firstName: '',
        surname: '',
        dateOfBirth: '',
        email: '',
        postcode: '',
        companyName: '',
        annualTurnover: '',
        loanAmount: '',
        loanTerm: '',
        countryPostcode: 'UK',
        formErrors: {
            firstNameError: '',
            surnameError: '',
            dateOfBirthError: '',
            emailError: '',
            postcodeError: '',
            companyNameError: '',
            annualTurnoverError: '',
            loanAmountError: '',
            loanTermError: '',
        }
    };
 
    static checkUserMaturity = (date) => {
        const currentYear = new Date().getFullYear();
        // eslint-disable-next-line
        const getUserBirthYear = date.split(/[.,\/ -]/);
        const ageCalculation = parseInt(currentYear) - parseInt(getUserBirthYear[2]);
        if (ageCalculation >= 18 && getUserBirthYear[2] > 1900) {
            return true;
        } else {
            return false;
        }
    }
 
    static fieldErrorMessageMap = {
        firstName: (value) => {
            const MIN_VALID_NAME_LENGTH = 2;
            const isNameInvalid = (
                !isString(value) ||
                !checkNameValidity.test(value) ||
                value.length < MIN_VALID_NAME_LENGTH
            );
 
            return (isNameInvalid)
                ? 'Invalid name'
                : '';
        },
        surname: (value) => {
            const MIN_VALID_SURNAME_LENGTH = 3;
            const isSurnameInvalid = (
                !isString(value) ||
                !checkNameValidity.test(value) ||
                value.length < MIN_VALID_SURNAME_LENGTH
            );
 
            return (isSurnameInvalid)
                ? 'Invalid name'
                : '';
        },
        email: (value) => {
            return !checkEmailValidity.test(value)
                ? 'Invalid email address'
                : '';
        },
        postcode: (value, country) => {
            const isPostcodeInvalid = (
                !(value.length >= 6 && value.length <= 8) &&
                !Postcode.validate(value, country)
            );
 
            return isPostcodeInvalid
                ? 'Minimum 6 characters required or invalid postcode'
                : '';
        },
        dateOfBirth: (value) => {
            const isDOBInvalid = !LoanForm.checkUserMaturity(value) || !ValidDate(value);
 
            return (isDOBInvalid)
                ? 'Date format is wrong or user is below age of 18'
                : '';
        },
        companyName: (value) => {
            return (value.length < 3)
                ? 'Minimum 3 characters required'
                : '';
        },
        loanAmount: (value) => {
            return !checkMoneyValidity.test(value)
                ? 'Value need to be in numbers'
                : '';
        },
        annualTurnover: (value) => {
            return !checkMoneyValidity.test(value)
                ? 'Minimum turnover amount is 15 000'
                : '';
        },
        loanTerm: (value) => {
            return (!value.length)
                ? 'Please select repayment period'
                : '';
        }
    };
 
    handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (formValid(this.state) && this.state.loanAmount >= 10000) {
            localStorage.setItem('loanAmount',  this.state.loanAmount);
            localStorage.setItem('loanTerm',  this.state.loanTerm);
            this.setState({
                firstName: '',
                surname: '',
                dateOfBirth: '',
                email: '',
                postcode: '',
                companyName: '',
                annualTurnover: '',
                loanAmount: '',
                loanTerm: '',
            });
            this.props.history.push('/approval');
        } else {
            this.props.history.push('/denied');
        }
    }
 
    handleInputChange = (event) => {
        const { value, name } = event.target;
        const formErrors = { ...this.state.formErrors };
        const errorStateName = name + 'Error';
 
        if (!value.length) {
            formErrors[errorStateName] = '';
        } else {
            if (name === 'postcode') {
                formErrors[errorStateName] = LoanForm.fieldErrorMessageMap[name](value, this.state.countryPostcode);
            } else {
                formErrors[errorStateName] = LoanForm.fieldErrorMessageMap[name](value);
            }
        }
 
        this.setState({
            formErrors,
            [name]: value
        });
    }
 
    // find values for the minimum and maximum loan month terms, if there are none in the data set default values
    generateMonthsOptions = () => {
        let min;
        let max;
        Data.loanForm.forEach(sections => {
            sections.fields.forEach(field => {
                ('minMonths' in field) ? min = field.minMonths : min = 12;
                ('maxMonths' in field) ? max = field.maxMonths + 1 : max = 61;
            });
        });
 
        return  Array.from(Array(max-min).keys()).map(i => min + i);
    }
 
    render() {
        const {
            firstName,
            surname,
            dateOfBirth,
            email,
            postcode,
            companyName,
            annualTurnover,
            loanAmount,
            loanTerm,
            formErrors
        } = this.state;
 
        const {
            firstNameError,
            surnameError,
            dateOfBirthError,
            emailError,
            postcodeError,
            companyNameError,
            annualTurnoverError,
            loanAmountError,
            loanTermError,
        } = formErrors;
 
        return (
            <div className="loan-form">
                <FormHead
                    title="Get your Instant quote"
                    subtitle="We only need a few details and it won't affect your credit score"
                />
 
                <form onSubmit={this.handleSubmit}>
                    <div className="loan-form-main-content">
                        <InputField
                            fieldLabel="First name"
                            fieldName="firstName"
                            fieldValue={firstName}
                            fieldError={firstNameError}
                            onChange={this.handleInputChange}
                        />
                        <InputField
                            fieldLabel="Surname"
                            fieldName="surname"
                            fieldValue={surname}
                            fieldError={surnameError}
                            onChange={this.handleInputChange}
                        />
                        <InputField
                            fieldLabel="Email"
                            fieldName="email"
                            fieldDetails="You must be director of limited company registered at Company House"
                            fieldValue={email}
                            fieldError={emailError}
                            onChange={this.handleInputChange} />
                        <InputField
                            fieldLabel="Date of birth"
                            fieldName="dateOfBirth"
                            fieldDetails="You must be 18 years or older to apply for ezbob loan"
                            fieldValue={dateOfBirth}
                            fieldError={dateOfBirthError}
                            onChange={this.handleInputChange}
                        />
                        <InputField
                            fieldLabel="Residential postcode"
                            fieldName="postcode"
                            fieldDetails="You must be UK resident"
                            fieldValue={postcode}
                            fieldError={postcodeError}
                            onChange={this.handleInputChange}
                        />
                        <InputField
                            fieldLabel="Company name"
                            fieldName="companyName"
                            fieldValue={companyName}
                            fieldError={companyNameError}
                            onChange={this.handleInputChange}
                        />
                        <InputField
                            fieldLabel="Annual turnover"
                            fieldName="annualTurnover"
                            fieldDetails="Your company must have a current annual turnover of 15k or more"
                            fieldValue={annualTurnover}
                            fieldError={annualTurnoverError}
                            onChange={this.handleInputChange}
                        />
                        <InputField
                            fieldLabel="Loan amount"
                            fieldName="loanAmount"
                            fieldDetails="£10,000 - £150,000"
                            fieldValue={loanAmount}
                            fieldError={loanAmountError}
                            onChange={this.handleInputChange}
                        />
                        <DropdownField
                            fieldLabel="Loan term"
                            fieldName="loanTerm"
                            fieldValue={loanTerm}
                            arrayOptions={this.generateMonthsOptions()}
                            fieldError={loanTermError}
                            onChange={this.handleInputChange}
                        />
                    </div>
 
                    <FormConsentDetails consentText={Data.loanForm} />
 
                    <div className='loan-form-submit-container'>
                        <button className='loan-form-submit-button' type='submit'>
                            Consent & Submit
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
 
export default withRouter(LoanForm);