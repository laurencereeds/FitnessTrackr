import React from "react";

import {fetchRoutinesByUser} from '../api';

const MyRoutines = (props) => {
    const { myRoutines , setMyRoutines } = props;
    useEffect( () => {
        fetchRoutinesByUser().then(setMyRoutines)
        console.log('routines', myRoutines);
    },[])
    
    return (
    <div>
        { myRoutines && myRoutines.map(({id, creatorId, isPublic, name, goal, creatorName, activities}) => 
            <div key={creatorId}
                className="row">
                <div className="col-sm-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{name}</h5>
                            <p className="card-text">{goal}</p>
                            <p className="card-text">By:{creatorName}</p>
                            <p className="card-text">Activities:</p>
                            <p className="card-text">{activities.name}</p>
                            <p className="card-text">{activities.description}</p>
                            <p className="card-text">{activities.duration}</p>
                            <p className="card-text">{activities.count}</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
            </div>
)}
    
    </div>)
};

export default MyRoutines;
