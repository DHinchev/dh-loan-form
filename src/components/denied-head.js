import React from 'react';
import ReactSVG from 'react-svg';
import Denied from '../assets/svg/denied.svg'; 
import More from '../assets/svg/more.svg'; 

const moreCount = ['','','']
const DeniedHead = ({ thankYouText }) => (
    
    <div className="denied-heading">

        <ReactSVG 
            svgClassName="denied-logo-icon"
            alt="Approved logo icon"
            src={Denied}
        />
        <p className="denied-thank-you-text">{thankYouText}</p>
        <div className="denied-more-section">
            {moreCount.map((image, index) => {
                return (
                    <ReactSVG 
                        svgClassName="denied-logo-icon-more"
                        alt="Approved logo icon"
                        key={index}
                        src={More}
                    />
                )
            })}
        </div>
    </div>
);
  
  export default DeniedHead;