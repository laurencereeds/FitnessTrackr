import React, {useEffect} from 'react';
import {fetchRoutines} from '../api';

const Routines = (props) => {
    const { routines , setRoutines } = props;
    useEffect( () => {
        fetchRoutines().then(setRoutines)
        console.log('routines', routines);
    },[])
    
    return (<>
    { routines && routines.map(({id, creatorId, isPublic, name, goal}) => 
    <div key={creatorId}
    className="row">
    <div className="col-sm-6">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{goal}</p>
          <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
  </div>
    )}


    
    </>)
};

export default Routines;