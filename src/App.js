import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import LoanForm from './components/loan-form';
import LoanApproved from './components/loan-approved';
import LoanDenied from './components/loan-denied';
 
const renderApproval = () => {
  const loanAmount = localStorage.getItem('loanAmount');
  const loanTerm = localStorage.getItem('loanTerm');

  if (!loanAmount || !loanTerm) {
    return <Redirect to="/" />
  }

  return <LoanApproved loanAmount={loanAmount} loanTerm={loanTerm} />
};

const App = (props) => (
  <Router>
    <div className="App">
      <Switch>
        <Route path="/approval" render={renderApproval} />
        <Route path="/denied" component={LoanDenied} />
        <Route exact path="/" component={LoanForm} />
      </Switch>
    </div>
  </Router>
);
 
export default App;