import React, { Component } from 'react';
import Postcode from 'postcode-validator';
import ValidDate from 'is-valid-date';
import {withRouter} from 'react-router-dom';
import InputField from './input-field';
import DropdownField from './dropdown-field';
import FormConsentDetails from './form-consent-details';
import FormHead from './form-head';
import '../styles/form-component/loan-form.css';
import Data from '../assets/data/data.json';

const checkEmailValidity = RegExp(
    // eslint-disable-next-line 
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const checkNameValidiry = RegExp(
    // eslint-disable-next-line 
    /^[a-z ,.'-]+$/i
);

const checkMoneyValidity = RegExp(
    // eslint-disable-next-line 
    /^[0-9]+(\.[0-9]{1,2})?$/
)

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
    constructor() {
        super();
        this.state = {
            firstName: '',
            surname: '',
            dateOfBirth: '',
            email: '',
            postcode: '',
            companyName: '',
            annualTurnover: '',
            loanAmout: '',
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
    } 

    handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (formValid(this.state) && this.state.loanAmout >= 10000) {
            localStorage.setItem('loanAmount',  this.state.loanAmout);
            localStorage.setItem('loanTerm',  this.state.loanTerm);
            this.setState({
                firstName: '',
                surname: '',
                dateOfBirth: '',
                email: '',
                postcode: '',
                companyName: '',
                annualTurnover: '',
                loanAmout: '',
                loanTerm: '',
            });
            this.props.history.push('/approval');
        } else {
            this.props.history.push('/denied');
        }
    }

    handleInputChange = (event) => {
        const { value, name } = event.target;
        let formErrors = { ...this.state.formErrors };

        switch (name) {
            case 'firstName':
              formErrors.firstNameError =
                value.length < 2 || (typeof value) !== 'string' || checkNameValidiry.test(value) === false ? 'Invalid name' : '';
                if(value.length === 0) {formErrors.firstNameError = '';}
              break;
            case 'surname':
              formErrors.surnameError =
                value.length < 3 || (typeof value) !== 'string' || checkNameValidiry.test(value) === false ? 'Invalid name' : '';
                if(value.length === 0) {formErrors.surnameError = '';}
              break;
            case 'email':
              formErrors.emailError = checkEmailValidity.test(value) ? '' : 'Invalid email address';
              if(value.length === 0) {formErrors.emailError = '';}
              break;
            case 'postcode':
              formErrors.postcodeError = !(value.length >= 6 && value.length <= 8) && Postcode.validate(value, this.state.countryPostcode) === false ? 'Minimum 6 characaters required or invalid postcode' : '';
              if(value.length === 0) {formErrors.postcodeError = '';}
              break;
            case 'dateOfBirth':
                formErrors.dateOfBirthError = !this.checkUserMaturity(value) || !ValidDate(value) ? 'Date format is wrong or user is below age of 18' : '';
                if(value.length === 0) {formErrors.dateOfBirthError = '';}
              break;
            case 'companyName':
                formErrors.companyNameError = value.length < 3 ? 'Minimum 3 characaters required' : '';
                if(value.length === 0) {formErrors.companyNameError = '';}
              break;
            case 'loanAmout':
                formErrors.loanAmountError = checkMoneyValidity.test(value) === false ? 'Value need to be in numbers' : '';
                if(value.length === 0) {formErrors.loanAmountError = '';}
              break;
            case 'annualTurnover':
                formErrors.annualTurnoverError = checkMoneyValidity.test(value) === false ? 'Minimum turnover amount is 15 000' : '';
                if(value.length === 0) {formErrors.annualTurnoverError = '';}
              break;
            case 'loanTerm':
                formErrors.loanTermError = value === '' ? 'Please select repayment period' : '';
              break;
            default:
              break;
          }

        this.setState({ formErrors, [name]: value });
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

    checkUserMaturity = (date) => {
        const currentYear = new Date().getFullYear();
        // eslint-disable-next-line 
        const getUserBirthYear = date.split(/[.,\/ -]/);
        const ageCalculation = parseInt(currentYear) - parseInt(getUserBirthYear[2]);
        if( ageCalculation >= 18 && getUserBirthYear[2] > 1900) {
            return true;
        } else {
            return false;
        }
    }

    render() {

      const {firstName, surname, dateOfBirth, email, postcode, companyName, annualTurnover, loanAmout, loanTerm, formErrors} = this.state;

      return (
        <div className='loan-form'>
            <FormHead title={'Get your Instant quote'} subtitle={`We only need a few details and it won't affect your credit score`}/>

            <form onSubmit={this.handleSubmit}>
                <div className='loan-form-main-content'>
                    <InputField fieldLabel={'First name'}
                                fieldValue={firstName}
                                fieldName={'firstName'}
                                fieldError={formErrors.firstNameError}
                                onChange={this.handleInputChange} />
                    <InputField fieldLabel={'Surname'}
                                fieldValue={surname}
                                fieldName={'surname'}
                                fieldError={formErrors.surnameError}
                                onChange={this.handleInputChange} />
                    <InputField fieldLabel={'Email'}
                                fieldValue={email}
                                fieldName={'email'}
                                fieldError={formErrors.emailError}
                                fieldDetails={'You must be director of limited company registered at Company House'}
                                onChange={this.handleInputChange} />
                    <InputField fieldLabel={'Date of birth'}
                                fieldValue={dateOfBirth}
                                fieldName={'dateOfBirth'}
                                fieldDetails={'You must be 18 years or older to apply for ezbob loan'}
                                fieldError={formErrors.dateOfBirthError}
                                onChange={this.handleInputChange} />
                    <InputField fieldLabel={'Residential postcode'}
                                fieldValue={postcode}
                                fieldName={'postcode'}
                                fieldDetails={'You must be UK resident'}
                                fieldError={formErrors.postcodeError}
                                onChange={this.handleInputChange} />
                    <InputField fieldLabel={'Company name'}
                                fieldValue={companyName}
                                fieldName={'companyName'}
                                fieldError={formErrors.companyNameError}
                                onChange={this.handleInputChange} />
                    <InputField fieldLabel={'Annual turnover'}
                                fieldValue={annualTurnover}
                                fieldName={'annualTurnover'}
                                fieldDetails={'Your company must have a current annual turnover of 15k or moret'}
                                fieldError={formErrors.annualTurnoverError}
                                onChange={this.handleInputChange} />
                    <InputField fieldLabel={'Loan ammount'}
                                fieldValue={loanAmout}
                                fieldName={'loanAmout'}
                                fieldDetails={'£10,000 - £150,000'}
                                fieldError={formErrors.loanAmountError}
                                onChange={this.handleInputChange} />
                    <DropdownField fieldLabel={'Loan term'}
                                   fieldValue={loanTerm}
                                   fieldName={'loanTerm'}
                                   arrayOptions={this.generateMonthsOptions()}
                                   fieldError={formErrors.loanTermError}
                                   onChange={this.handleInputChange} />
                </div>

                <FormConsentDetails consentText={Data.loanForm}/>

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