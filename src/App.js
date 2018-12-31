import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LoanForm from './components/loan-form';
import LoanApproved from './components/loan-approved';
import LoanDenied from './components/loan-denied';
import './App.css';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
        <Switch>
          <Route exact path="/" render={props => <LoanForm />} />
          <Route exact path="/approval" render={props => <LoanApproved /> } />
          <Route exact path="/denied" render={props => <LoanDenied />} />
        </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
