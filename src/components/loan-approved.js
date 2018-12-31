import React, { Component } from 'react';
import ApprovedHead from './approved-head'; 
import ApprovedSummaryContainer from './approved-summary-container'; 
import '../styles/approved-component/approved.css';
import Data from '../assets/data/data.json';

class LoanApproved extends Component {

  render() {
    return (
        <div className='loan-approved'>
            <ApprovedHead 
                thankYouText={'We are happy to inform you that you are eligible for receiving funding up tp:'}
                loanAmount={localStorage.getItem('loanAmount')}
                loanTerm={localStorage.getItem('loanTerm')}
                upTo={'for up to'}/>
            <ApprovedSummaryContainer />
            <p className='loan-approved-apply-info'>{Data.approvalApplyInfoText}</p>
            <button className='loan-approved-submit-button' type='submit'>
                Apply now
            </button>
            <p className='loan-approved-interest-details'>{Data.loanApprovedInterestDetailsText}</p>
        </div>
    );
  }
}

export default LoanApproved;
