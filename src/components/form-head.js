import React from 'react';
import ReactSVG from 'react-svg'
import LoanLogo from '../assets/svg/money-loan-logo.svg';
 
const FormHead = ({ title, subtitle }) => (
    <div className="loan-form-heading">
        <div className="logo-with-title">
            <ReactSVG 
                src={LoanLogo}
                svgClassName="loan-form-svg-logo"
            />
            <h2 className="loan-form-title-text">{title}</h2>
        </div>
        <h3 className="loan-form-subtitle">{subtitle}</h3>
    </div>
);
 
export default FormHead;