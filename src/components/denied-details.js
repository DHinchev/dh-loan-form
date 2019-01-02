import React from 'react';

const DeniedDetails = ({sorryText, tryAgainText}) => (
    <div className="denied-details">
        <p className="denied-sorry-text">{sorryText}</p>
        <p className="denied-try-again-text">{tryAgainText}</p>
    </div>
)
  
  export default DeniedDetails;