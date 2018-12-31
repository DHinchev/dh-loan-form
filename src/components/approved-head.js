import React, { Component } from 'react';
import Approved from '../assets/svg/approved.svg'; 

class FormHead extends Component {

    render() {
        const {thankYouText, loanAmount, loanTerm, upTo} = this.props;
        return (
            <div className='approved-heading'>
                <img
                className='approved-logo-icon'
                alt='Approved logo icon'
                draggable="false"
                src={Approved}
                />
                <p className='approved-text'>{thankYouText} <span className='approved-amount'>{loanAmount}</span> {upTo} {loanTerm}</p>
            </div>
        )
    }
  }
  
  export default FormHead;