import 'bootstrap/dist/css/bootstrap.min.css';
import './bootstrap.css';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { fetchActivities, register, login, createActivity, fetchRoutinesByUser, 
         editActivity, fetchRoutineActivities, fetchRoutines, createRoutine, 
         editRoutine, deleteRoutine, createRoutineActivity, editRoutineActivity, deleteRoutineActivity } from './api';

import  NavBar from './components/NavBar';  
import Home from './components/Home'; 
import Login from './components/Login';
import Register from './components/Register';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  // register('poildecarotte1', 'testing01')
  // login('poildecarotte1', 'testing01') 
  // fetchActivities()
  // createActivity()
  // fetchRoutinesByUser()
  // editActivity()
  // fetchRoutineActivities()
  // fetchRoutines()
  // createRoutine()
  // editRoutine()
  // deleteRoutine()
  // createRoutineActivity()
  // editRoutineActivity()
  // deleteRoutineActivity()
  return (
    <div id="App">
      <NavBar />
      <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
    </Switch>
    </div>
  );
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
