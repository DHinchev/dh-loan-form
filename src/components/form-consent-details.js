import React from 'react';
 
const FormConsentDetails = ({ consentText }) => (
    <div className="loan-form-consent-container">
        <p>
            {
                consentText.consent
            }
        </p>
    </div>
);
 
export default FormConsentDetails;