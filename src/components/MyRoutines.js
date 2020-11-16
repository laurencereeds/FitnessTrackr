import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';
import {fetchRoutinesByUser, createRoutine, deleteRoutine, createRoutineActivity, editRoutine, fetchActivities, deleteRoutineActivity, editRoutineActivity } from '../api';

const MyRoutines = (props) => {
    const {userData, allActivities, setAllActivities } = props;
    const [myRoutines, setMyRoutines] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [isEditActive, setEditIsActive] = useState(false);
    const [activityIsActive, setActivityIsActive] = useState(false);
    const [isPublic, setIsPublic]= useState(false);
    const [updateRoutineActivity, setUpdateRoutineActivity] = useState(false);
    const [name, setName]= useState('');
    const [goal, setGoal]= useState('');
    const [count, setCount] = useState('');
    const [duration, setDuration] = useState('');
    const [routineId, setRoutineId] = useState('');
    const [activityId, setActivityId] = useState('');
    const [routineActivityId, setRoutineActivityId] = useState('');
    const [routineActivityName, setRoutineActivityName] = useState('')


    let history = useHistory();

    const handleCreateRoutine = async () => {
        try {
            event.preventDefault();
            const result = await createRoutine(name, goal, isPublic);
            if (result.error) {
                swal({
                    title: "Oh no!",
                    text: "A routine with this name already exists",
                    icon: "'error'",
                    button: "Oh la la!",
                  });
            } else {
            history.push("/myRoutines");
            window.location.reload(true);
            swal({
                title: "Success!",
                text: "You created a new routine!",
                icon: "success",
              });
            }
        } catch(error) {
            console.error(error);
        }

    }

    const handleDeleteRoutine = async (routineId) => {
        try {
            const result = await deleteRoutine(routineId)
            if (result.error) {
                swal({
                    title: "Oh No!",
                    text: "Something went wrong when deleting the routine",
                    icon: "'error'",
                    button: "Oh la la!",
                  });
            } else {
            history.push("/myRoutines");
            window.location.reload(true);
            swal({
                title: "Success!",
                text: "You successfully deleted your routine!",
                icon: "success",
              });
            }

        } catch(error) {
            console.error(error)
        }
    }

    const handledeleteRoutineActivity = async (routineActivityId) => {
        try {
            const result = await deleteRoutineActivity(routineActivityId)
            if (result.error) {
                swal({
                    title: "Oh No!",
                    text: "Something went wrong when deleting the routine activity",
                    icon: "'error'",
                    button: "Oh la la!",
                  });
            } else {
            history.push("/myRoutines");
            window.location.reload(true);
            swal({
                title: "Success!",
                text: "You successfully deleted your routine activity!",
                icon: "success",
              });
            }
        } catch(error) {
            console.error(error)
        }
    }

    const handleEditRoutine = async (routineId, name, goal) => {
        try {
            event.preventDefault();
            const result = await editRoutine(routineId, name, goal)
            if (result.error) {
                swal({
                    title: "Oh No!",
                    text: "Something went wrong when editing the routine",
                    icon: "'error'",
                    button: "Oh la la!",
                  });
            } else {
            history.push("/myRoutines");
            window.location.reload(true);
            swal({
                title: "Success!",
                text: "You successfully edited your routine!",
                icon: "success",
              });
            }

        } catch(error) {
            console.error(error)
        }
    }

    const handleEditRoutineActivity = async (routineActivityId, count, duration) => {
        try {
            event.preventDefault();
            const result = await editRoutineActivity(routineActivityId, count, duration)
            if (result.error) {
                swal({
                    title: "Oh No!",
                    text: "Something went wrong when editing the routine",
                    icon: "'error'",
                    button: "Oh la la!",
                  });
            } else {
            history.push("/myRoutines");
            window.location.reload(true);
            swal({
                title: "Success!",
                text: "You successfully edited your routine!",
                icon: "success",
              });
            }

        } catch(error) {
            console.error(error)
        }
    }


    const handleSelect=(e)=>{
        setActivityId(e.target.value);
      }
    


    const handleCreateActivity = async (routineId, activityId) => {
        try {
            event.preventDefault();
            const result = await createRoutineActivity(routineId,activityId, count, duration);
            if (result.error) {
                swal({
                    title: "Oh No!",
                    text: "An activity with this name already exists",
                    icon: "'error'",
                    button: "Oh la la!",
                  });
            } else {
            history.push("/myRoutines");
            window.location.reload(true);
            swal({
                title: "Success!",
                text: "You created a new activity!",
                icon: "success",
              });
            }

        } catch(error) {
            console.error(error);
        }
    }
    
    useEffect( () => {
        if (userData.username) {
            fetchRoutinesByUser(userData.username).then(response => setMyRoutines(response)).catch(error => console.log(error))
        }
        if (allActivities.length === 0) {
            fetchActivities().then(response => setAllActivities(response)).catch(error => console.log(error))
        }
    },[userData])

    return (<>

    <button type="button" className="btn btn-primary btn-lg btn-block" onClick={setIsActive}>Create Routine</button>

        { isActive ? 
            <div className="container">
            <form className="activityForm">
                <div className="form-group">
                    <label >Name</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => {setName(e.target.value)}}/>
                </div>
                <div className="form-group">
                    <label >Goal</label>
                    <input type="text" className="form-control" value={goal} onChange={(e) => {setGoal(e.target.value)}}/>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value={isPublic} onClick={() => setIsPublic(true)}/>
                    <label className="form-check-label">
                        Is Public
                    </label>
                </div>
                <div>
                <button type="submit" className="btn btn-primary" onClick={ handleCreateRoutine}>Submit</button>
                </div>
            </form>
            </div>
            : " "
        }

        { isEditActive ? 
            <div className="container">
                <form className="activityForm" style={{ marginLeft: "5em", marginRight: "5em", lineHeight:1}}>
                    <div className="form-group">
                        <h3>Update the Name and Goal for the routine</h3>
                            <label >Name</label>
                            <input type="text" className="form-control" placeholder={name} value={name} onChange={(e) => {setName(e.target.value)}}/>
                    </div>
                    <div className="form-group">
                            <label >Goal</label>
                            <input type="text" className="form-control" placeholder={goal} value={goal} onChange={(e) => {setGoal(e.target.value)}}/>
                    </div>
                    <div>
                            <button type="submit" className="btn btn-primary" onClick={() => handleEditRoutine(routineId, name, goal)}>Submit</button>
                    </div>
                </form>
            </div>
                : " "
            }
        { updateRoutineActivity ?
            <div className="container">
                <form className="activityForm">
                    <div className="form-group">
                        <h3>Update the Count and Duration for the activity {routineActivityName} </h3>
                            <label >Count</label>
                            <input type="text" className="form-control" placeholder={count} value={count} onChange={(e) => {setCount(e.target.value)}}/>
                    </div>
                    <div className="form-group">
                            <label >Duration</label>
                            <input type="text" className="form-control" placeholder={duration} value={duration} onChange={(e) => {setDuration(e.target.value)}}/>
                    </div>
                    <div>
                            <button type="submit" className="btn btn-primary" onClick={() => handleEditRoutineActivity(routineActivityId, count, duration)}>Submit</button>
                    </div>
                </form>
            </div>
                : " "
            }

    <div class="container"> <h1 class="mb-0">My Routines</h1>
        { myRoutines && myRoutines.map(({id, creatorId, isPublic, name, goal, creatorName, activities}) => 
            <div key={id} 
                className="row">
                <div className="col-sm-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{name}</h5>
                            <p className="card-text">{goal}</p>
                            <p className="card-text">By: {creatorName}</p>
                            <div>
                            <button className="btn btn-danger" onClick={() => handleDeleteRoutine(id)} >Delete</button>
                            </div>
                            <div>
                            <button id={id} className="btn btn-secondary" onClick={() => 
                            {
                            setEditIsActive(true)
                            setName(name)
                            setGoal(goal)
                            setRoutineId(id)
                            }
                            }>Edit</button>
                            </div>
                            <div>
                            <button id={id} type="button" className="btn btn-primary" onClick={() => { setActivityIsActive(true)
                            setRoutineId(id)
                            }}>Add Activity</button>
                            </div>
                        
                            { activities.map(({id, routineActivityId, name, description, count, duration}) => <div key={id} className="card">
                                        <div className="card-body">
                                            <h4>Activity</h4>
                                            <h5 className="card-title">{name}</h5>
                                            <p className="card-text">{description}</p>
                                            <p className="card-text">Count: {count}</p>
                                            <p className="card-text">Duration: {duration} min</p>
                                            <a href="#" className="btn btn-danger" onClick={() => handledeleteRoutineActivity(routineActivityId)}>Delete</a>
                                            <a href="#" className="btn btn-secondary" onClick={() => {
                                                setUpdateRoutineActivity(routineActivityId)
                                                setRoutineActivityId(routineActivityId)
                                                setRoutineActivityName(name)
                                                setCount(count)
                                                setDuration(duration)
                                            }
                                            }>Edit</a>
                                        </div>
                                    </div>
                            )}
                            { activityIsActive && routineId == id ? 
                                <form className="activityForm">
                                        <select onChange={ handleSelect }>{
                                            allActivities.map(activity => (
                                                    <option key={ activity.id } value={ activity.id }>
                                                    { activity.name }
                                                    </option>
                                                    ))
                                                    }</select>
                        
                                        <div className="form-group">
    
                                            <label >Count</label>
                                                <input type="text" className="form-control" value={count} onChange={(e) => {setCount(e.target.value)}}></input>
                                            <label >Duration</label>
                                                <input type="email" className="form-control" value={duration} onChange={(e) => {setDuration(e.target.value)}}></input>
                                            <div>
                                                <button type="submit" className="btn btn-primary" onClick={() => handleCreateActivity(routineId, activityId)}>Submit</button>
                                            </div>
                                        </div>
                                </form>
                            : " "
                            }
                        </div>
                    </div>
                </div>
            </div>
)}
</div>

</>)
};

export default MyRoutines;

