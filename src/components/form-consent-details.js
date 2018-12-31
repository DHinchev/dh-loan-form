import React, { Component } from 'react';

class FormConsentDetails extends Component {

    render() {
    const {consentText} = this.props;

        return (
            <div className='loan-form-consent-container'>
                <p>{consentText.map(section => {
                    return (section.consent);
                })}</p>
            </div>
        )
    }
  }
  
  export default FormConsentDetails;