import React, { Component } from 'react';

class InputFieldDetails extends Component {

    render() {
    const {fieldDetails} = this.props;

        return (
            <p className='input-filed-details'>{fieldDetails}</p>
        )
    }
  }
  
  export default InputFieldDetails;