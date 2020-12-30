import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router, Route } from 'react-router';
import {browserHistory} from 'react-router';
import Authors from './components/Authors';
ReactDOM.render(

    <Router history={browserHistory}>
      <Route exact path="/" component={App}/>
      <Route  path="/Authors" component={Authors}/>
    </Router>
,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
