import React, { Component } from 'react';
import Data from '../assets/data/data.json';

class ApprovedSummaryContainer extends Component {

    calculateInterestAmount = () => {
        const interest = parseInt(this.props.loanAmount, 10) * (Data.interestPercentage / 100);
        return this.props.loanAmount.length ? interest : this.props.loanAmount;
    }

    totalAmountToPay = () => {
        const totalSum = parseInt(this.props.loanAmount, 10) + this.calculateInterestAmount();
        return this.props.loanAmount.length ? totalSum : this.props.loanAmount;
    }

    monthlyPayment = () => {
        const termsAmountAsNumber = this.props.loanTerm.length ? this.props.loanTerm.split(" ") : '';
        const monthAmountToPay = Math.round((this.totalAmountToPay() / parseInt(termsAmountAsNumber[0], 10))/100)*100;
        const monthAmountToPayString = monthAmountToPay.toLocaleString();
        return this.props.loanTerm.length ? monthAmountToPayString : this.props.loanAmount;
    }

    render() {
        const currency = Data.currency;
        const totalSumString = this.totalAmountToPay().toLocaleString();
        const interesttring = this.calculateInterestAmount().toLocaleString();
        const principalString = this.props.loanAmount.length ? parseInt(this.props.loanAmount, 10).toLocaleString() : this.props.loanAmount;

        return (
            <div className="approved-summary-container">
                <p className="approval-summary-text">Your monthly repayment will be:</p>
                <p className="approved-repayment-amount">{currency}{this.monthlyPayment()}</p>

                <p className="approval-summary-text">
                    <span className="approved-summary-text-dash">-</span> Principal:
                </p>
                <p className="approved-loan-amount">{currency}{principalString}</p>

                <p className="approval-summary-text">
                    <span className="approved-summary-text-dash">-</span> Interest:
                </p>
                <p className="approved-interest-amount">{currency}{interesttring}</p>

                <p className="approval-summary-text">
                    <span className="approved-summary-text-dash">-</span> Total repayment:
                </p>
                <p className="approved-total-repayment-amount">{currency}{totalSumString}</p>
            </div>
        )
    }
  }
  
  export default ApprovedSummaryContainer;