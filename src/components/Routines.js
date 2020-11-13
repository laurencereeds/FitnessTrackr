import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import { fetchRoutines } from '../api';

const Routines = () => {
    const [routines, setRoutines] = useState([])

    useEffect( () => {
        fetchRoutines().then(setRoutines)
        console.log('routines', routines);
        console.log('setRoutines', setRoutines);
    },[])

    // useEffect( () => {
    //     fetchRoutineActivities().then(setActivities)
    //     console.log('routines', activities);
    // },[])


    
    return (<> <h1>All Routines</h1>
    {  
    routines && routines.map(({activities, id, creatorId, creatorName, isPublic, name, goal}) => 
    <div key={id}
    className="row">
    <div className="col-sm-6">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">{name}</h3>
          <p className="card-text">By {creatorName}</p>
          <p className="card-text">Goal: {goal}</p>
          <p className="card-text">IsPublic: {isPublic}</p>
          {activities.map(({id, name, description, count, duration}) => {
              return<div key={id} className="card">
                    <div className="card-body">
                        <h4>Activity</h4>
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text">Count: {count}</p>
                        <p className="card-text">Duration: {duration} min</p>
                    </div>
                </div>
          })}
          {/* <p className="card-text">Activities: {goal}</p>
          <a href="#" className="btn btn-primary">Go somewhere</a> */}
        </div>
      </div>
    </div>
  </div>
    )}
    </>)
};

export default Routines;

{/* activities.map(({id, name, description, duration, count}) => {
                        <div key={id}
            className="row">
              <div className="col-sm-6">
                  <div className="card">
                      <div className="card-body">
                          <h5 className="card-title">{name}</h5>
                          <p className="card-text">{description}</p>
                          <p className="card-text">{duration}</p>
                          <p className="card-text">{duration}</p> */}
