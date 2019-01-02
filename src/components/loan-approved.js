import React, { Component } from 'react';
import ApprovedHead from './approved-head'; 
import ApprovedSummaryContainer from './approved-summary-container'; 
import '../styles/approved-component/approved.scss';
import Data from '../assets/data/data.json';

class LoanApproved extends Component {
    
    state = {
        loanAmount: localStorage.getItem('loanAmount') || '',
        loanTerm: localStorage.getItem('loanTerm') || ''
    }

    render() {
        const {
            loanAmount,
            loanTerm
        } = this.state;

        return (
            <div className="loan-approved">
                <ApprovedHead 
                    thankYouText={"We are happy to inform you that you are eligible for receiving funding up tp:"}
                    loanAmount={loanAmount}
                    loanTerm={loanTerm}
                    upTo={"for up to"}
                />
                <ApprovedSummaryContainer 
                    loanAmount={loanAmount}
                    loanTerm={loanTerm}
                />
                <p className="loan-approved-apply-info">{Data.approvalApplyInfoText}</p>
                <div className="loan-approved-button-container">
                    <button className="loan-approved-submit-button" type="submit">
                        Apply now
                    </button>
                </div>
                <p className="loan-approved-interest-details">{Data.loanApprovedInterestDetailsText}</p>
            </div>
        );
    }
}

export default LoanApproved;
