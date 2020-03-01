import React from 'react';
import './App.css';
import Register from "./components/Register/register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  return (
      <Router>
        <Switch>


            <Route path="/register" component={Register} />


        </Switch>
      </Router>
  );
}

export default App;
