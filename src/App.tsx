import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Details from './Components/Details/Details';

function App() {
  return (
    <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/details'>
          <Details />
        </Route>
        <Route path="*">
          <p>page Not Found</p>
        </Route>
      </Switch>
  );
}

export default App;
