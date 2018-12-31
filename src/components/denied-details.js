import React, { Component } from 'react';

class DeniedDetails extends Component {

    render() {
    const {sorryText, tryAgainText} = this.props;
        return (
            <div className='denied-details'>
                <p className='denied-sorry-text'>{sorryText}</p>
                <p className='denied-try-again-text'>{tryAgainText}</p>
            </div>
        )
    }
  }
  
  export default DeniedDetails;