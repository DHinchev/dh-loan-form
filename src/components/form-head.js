import React from 'react';
import LoanLogo from '../assets/svg/money-loan-logo.svg';
 
const FormHead = ({ title, subtitle }) => (
    <div className="loan-form-heading">
        <div className="logo-with-title">
            <img
                className="loan-logo-icon"
                alt="Loan logo icon"
                draggable="false"
                src={LoanLogo}
            />
            <h2 className="loan-form-title-text">{title}</h2>
        </div>
        <h3 className="loan-form-subtitle">{subtitle}</h3>
    </div>
);
 
export default FormHead;