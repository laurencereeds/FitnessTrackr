import React, { useEffect, useState } from 'react';
import { fetchRoutines } from '../api';

const Routines = () => {
    const [routines, setRoutines] = useState([])

    useEffect( () => {
        fetchRoutines().then(response => setRoutines(response)).catch(error => console.log(error))
    },[])
    
    return (
    <> <h1>Routines</h1>
        {routines && routines.map(({activities, id, creatorName, name, goal}) => 
            <div key={id}
            className="row">
            <div className="col-sm-6">
            <div className="card">
                <div className="card-body">
                <h3 className="card-title">{name}</h3>
                <p className="card-text">By {creatorName}</p>
                <p className="card-text">Goal: {goal}</p>
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
                </div>
            </div>
            </div>
        </div>
        )} 
    </>)
};

export default Routines;

