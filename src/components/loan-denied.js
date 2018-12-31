import React, { Component } from 'react';
import DeniedHead from './denied-head'; 
import DeniedDetails from './denied-details'; 
import '../styles/denied-component/denied.css';

class LoanDenied extends Component {

  render() {
    return (
        <div className='loan-denied'>
           <DeniedHead 
                thankYouText={'Thank you for the time in checking for yor eligibility for receiving bussiness loan with us'} />
           <DeniedDetails
                sorryText={'Unfortunatelly we are unable to provide you with funds at this time'}
                tryAgainText={'You may try and check in 30 days'} />
        </div>
    );
  }
}

export default LoanDenied;
