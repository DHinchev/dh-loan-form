import React from 'react';
import ReactSVG from 'react-svg';
import Approved from '../assets/svg/approved.svg'; 

const ApprovedHead = ({ thankYouText, loanAmount, loanTerm, upTo }) => (
    <div className="approved-heading">
        <ReactSVG 
        src={Approved}
        svgClassName="approved-logo-icon"
        alt="Approved logo icon"
    />
        <p className="approved-text">{thankYouText} <span className="approved-amount">{loanAmount}</span> {upTo} {loanTerm}</p>
    </div>
)
  
  export default ApprovedHead;