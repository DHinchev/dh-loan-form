import React from 'react';
import Denied from '../assets/svg/denied.svg'; 
import More from '../assets/svg/more.svg'; 

const moreCount = ['','','']
const DeniedHead = ({ thankYouText }) => (
    
    <div className="denied-heading">
        <img
            className="denied-logo-icon"
            alt="Denied logo icon"
            draggable="false"
            src={Denied}
        />
        <p className="denied-thank-you-text">{thankYouText}</p>
        <div className="denied-more-section">
            {moreCount.map((image, index) => {
                return (
                    <img
                    className="denied-logo-icon"
                    key={index}
                    alt="More info logo icon"
                    draggable="false"
                    src={More} />
                )
            })}
        </div>
    </div>
);
  
  export default DeniedHead;