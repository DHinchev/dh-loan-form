import React, { Component } from 'react';
import LoanLogo from '../assets/svg/money-loan-logo.svg';

class FormHead extends Component {

    render() {
    const {title, subtitle} = this.props;

        return (
            <div className='loan-form-heading'>
                <img
                className='loan-logo-icon'
                alt='Loan logo icon'
                src={LoanLogo}
                />
                <div className='loan-form-title'>
                    <h2 className='loan-form-title-text'>{title}</h2>
                </div>
                <h3 className='loan-form-subtitle'>{subtitle}</h3>
            </div>
        )
    }
  }
  
  export default FormHead;