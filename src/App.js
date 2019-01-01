import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LoanForm from './components/loan-form';
import LoanApproved from './components/loan-approved';
import LoanDenied from './components/loan-denied';
import './App.css';
 
const App = (props) => (
  <Router>
    <div className="App">
      <Switch>
        <Route path="/approval" component={LoanApproved} />
        <Route path="/denied" component={LoanDenied} />
        <Route exact path="/" component={LoanForm} />
      </Switch>
    </div>
  </Router>
);
 
export default App;