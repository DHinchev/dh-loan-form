import React, { Component } from 'react';
import Data from '../assets/data/data.json';

class ApprovedSummaryContainer extends Component {

    calculateInterestAmount = () => {
        const interest = parseInt(localStorage.getItem('loanAmount'), 10) * (Data.interestPercentage / 100);
        return interest;
    }

    totalAmountToPay = () => {
        const totalSum = parseInt(localStorage.getItem('loanAmount'), 10) + this.calculateInterestAmount();
        return totalSum;
    }

    monthlyPayment = () => {
        const termsAmountAsNumber = localStorage.getItem('loanTerm').split(" ");
        const monthAmountToPay = Math.round((this.totalAmountToPay() / parseInt(termsAmountAsNumber[0], 10))/100)*100;
        const monthAmountToPayString = monthAmountToPay.toLocaleString();
        return monthAmountToPayString;
    }

    render() {
        const currency = Data.currency;
        const totalSumString = this.totalAmountToPay().toLocaleString();
        const interesttring = this.calculateInterestAmount().toLocaleString();
        const principalString = parseInt(localStorage.getItem('loanAmount'), 10).toLocaleString();

        return (
            <div className='approved-summary-container'>
                <p className='approval-summary-text'>Your monthly repayment will be:</p>
                <p className='approved-repayment-amount'>{currency}{this.monthlyPayment()}</p>

                <p className='approval-summary-text'><span className='approved-summary-text-dash'>-</span> Principal:</p>
                <p className='approved-loan-amount'>{currency}{principalString}</p>

                <p className='approval-summary-text'><span className='approved-summary-text-dash'>-</span> Interest:</p>
                <p className='approved-interest-amount'>{currency}{interesttring}</p>

                <p className='approval-summary-text'><span className='approved-summary-text-dash'>-</span> Total repayment:</p>
                <p className='approved-total-repayment-amount'>{currency}{totalSumString}</p>
            </div>
        )
    }
  }
  
  export default ApprovedSummaryContainer;