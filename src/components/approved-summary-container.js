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
        const termsAmointAsNumber = localStorage.getItem('loanTerm').split(" ");
        const monthAmountToPay = Math.round((this.totalAmountToPay() / parseInt(termsAmointAsNumber[0], 10))/100)*100;
        return monthAmountToPay;
    }

    render() {
        const currency = Data.currency;
        return (
            <div className='approved-summary-container'>
                <p>Your monthly repayment will be:</p>
                <p className='approved-repayment-amount'>{currency}{this.monthlyPayment()}</p>

                <p>Principal:</p>
                <p className='approved-loan-amount'>{currency}{localStorage.getItem('loanAmount')}</p>

                <p>Interest:</p>
                <p className='approved-interest-amount'>{currency}{this.calculateInterestAmount()}</p>

                <p>Total repayment:</p>
                <p className='approved-total-repayment-amount'>{currency}{this.totalAmountToPay()}</p>
            </div>
        )
    }
  }
  
  export default ApprovedSummaryContainer;