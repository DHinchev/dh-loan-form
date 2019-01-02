import React from 'react';
import Approved from '../assets/svg/approved.svg'; 

const ApprovedHead = ({ thankYouText, loanAmount, loanTerm, upTo }) => (
    <div className="approved-heading">
        <img
        className="approved-logo-icon"
        alt="Approved logo icon"
        draggable="false"
        src={Approved}
        />
        <p className="approved-text">{thankYouText} <span className="approved-amount">{loanAmount}</span> {upTo} {loanTerm}</p>
    </div>
)
  
  export default ApprovedHead;