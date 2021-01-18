import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router } from 'react-router-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import {browserHistory} from 'react-router';
import Authors from './components/Authors';
import Register from './components/Register';
import Home from './components/Home';
import loggedReducer from './reducers/isLogged';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
const store= createStore(loggedReducer);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={browserHistory}>
      <Route exact path="/" component={App}/>
      <Route  path="/authors" component={Authors}/>
      <Route  path="/register" component={Register}/>
      <Route  path="/home" component={Home}/>
    </BrowserRouter>
  </Provider>
,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
