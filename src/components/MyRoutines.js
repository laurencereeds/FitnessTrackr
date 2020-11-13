import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';
import {fetchRoutinesByUser, fetchUserData, createRoutine, deleteRoutine, createRoutineActivity} from '../api';

const MyRoutines = (props) => {
    // const {activities, setActivities, myInfo, setMyInfo} = props;
    const [myRoutines, setMyRoutines] = useState([]);
    const [myInfo, setMyInfo] = useState([]);
    const [isActive, setIsActive] = useState(false)
    const [name, setName]= useState('');
    const [goal, setGoal]= useState('');
    const [isPublic, setIsPublic]= useState(false);
    const [activityIsActive, setActivityIsActive] = useState('');
    const [activityName, setActivityName] = useState('');
    const [activityDescription, setActivityDescription] = useState('');
    const [count, setCount] = useState('');
    const [duration, setDuration] = useState('');
    const [dropDown, setDropDownIsActive] = useState(false);
    
    console.log('myInfo', myInfo)

    let history = useHistory();
    // const [myInfo, setMyInfo] = useState({});

    const handleSetUp = async () => {
        try {
             const myRoutines = await fetchUserData(setMyInfo).then(myInfo => fetchRoutinesByUser(myInfo.username))
            //  console.log('myRoutines', myRoutines)

            //  const userInfo = await fetchUserData(setMyInfo)
            //  setMyInfo(userInfo)
            //  console.log('myInfo.username', myInfo)
            //  const data = await fetchRoutinesByUser(myInfo.username).then(setMyRoutines)
            // const userRoutines = fetchRoutinesByUser(userInfo.username).then(response => setMyRoutines(response)).catch(error => console.log(error))
            // setMyRoutines(userRoutines)
            // console.log('userRoutine', userRoutines)
            // console.log('routines', myRoutines);  

            // console.log('result', data) 
        } catch(error) {
            console.error(error)
        }
    }

    const handleCreateRoutine = async () => {
        let array = []
        // let history = useHistory();
        try {
            // let history = useHistory();
            event.preventDefault();
            // console.log('activity.name', activities)
            const result = await createRoutine(name, goal, isPublic);
            console.log('result', result);
            // console.log('result.name', result.name)
            if (result.error) {
                swal({
                    title: "Oh no!",
                    text: "A routine with this name already exists",
                    icon: "success",
                    button: "Oh la la!",
                  });
            } else {
            array.push(result)
            // let history = useHistory();
            history.push("/activities");
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

    const handleDelete = async (routineId) => {
        try {
            const result = await deleteRoutine(routineId)
            // console.log('myRoutines.id', myRoutines.id)
            // console.log('resultDelete', result)

        } catch(error) {
            console.error(error)
        }
    }
    const handleCreateActivity = async () => {
        let array = []
        // let history = useHistory();
        try {
            // let history = useHistory();
            event.preventDefault();
            // console.log('activity.name', activities)
            const result = await createRoutineActivity(routineId,activityId, count, duration);
            // console.log(result);
            // console.log('result.name', result.name)
            if (result.error) {
                swal({
                    title: "Good job!",
                    text: "An activity with this name already exists",
                    icon: "success",
                    button: "Oh la la!",
                  });
            } else {
            array.push(result)
            // let history = useHistory();
            history.push("/myRoutines");
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
    
        // console.log('myInfo', myInfo)
        // setMyInfo(myInfo)
        // fetchRoutinesByUser(myInfo.username).then(setMyRoutines)
        // console.log('routines', myRoutines);


    useEffect( () => {
    handleSetUp()
    },[])

    return (<>

    <button type="button" className="btn btn-primary btn-lg btn-block" onClick={setIsActive}>Create Routine</button>

    { isActive ? 
        <form className="activityForm">
            <div className="form-group">
            <label >Name</label>
            <input type="email" className="form-control" value={name} onChange={(e) => {setName(e.target.value)}}></input>
            </div>
            <div className="form-group">
            <label >Description</label>
            <input type="email" className="form-control" value={goal} onChange={(e) => {setGoal(e.target.value)}}></input>
            </div>
            <div className="form-check">
                <input class="form-check-input" type="checkbox" value={isPublic} onChange={(e) => {setIsPublic(e.target.value)}}></input>
                <label class="form-check-label" for="defaultCheck1">
                    Is Public
                </label>
            </div>

            <div>
            <button type="submit" className="btn btn-primary" onClick={handleCreateRoutine}>Submit</button>
            </div>
        </form>
         : " "
    }

    <div> 
        { myRoutines && myRoutines.map(({id, creatorId, isPublic, name, goal, creatorName, activities}) => 
            <div key={id}
                className="row">
                <div className="col-sm-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{name}</h5>
                            <p className="card-text">{goal}</p>
                            <p className="card-text">By: {creatorName}</p>
                            <p className="card-text">{isPublic}</p>
                            <p className="card-text">Activities:</p>
                            <a href="#" className="btn btn-danger">Delete</a>
                            <a href="#" className="btn btn-secondary">Edit</a>
                            <button type="button" className="btn btn-primary" onClick={setActivityIsActive(true)}>Add Activity</button>
                        
                            { activities.map(({id, routineActivityId, name, description, count, duration}) => {
              return<div key={routineActivityId} className="card">
                    <div className="card-body">
                        <h4>Activity</h4>
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text">Count: {count}</p>
                        <p className="card-text">Duration: {duration} min</p>
                        <a href="#" className="btn btn-danger">Delete</a>
                    </div>
                </div>
          })}
              { activityIsActive ? 
        <form className="activityForm">
        <div class="btn-group">
  <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Available Activities
  </button>
  {dropDown ? 
    // <div className="dropdown-menu show" >
    // <a className="dropdown-item" href="#">Action</a>
    // <a className="dropdown-item" href="#">Another action</a>
    // <a className="dropdown-item" href="#">Something else here</a>
    // <div className="dropdown-divider"></div>
    // <a className="dropdown-item" href="#">Separated link</a>
    <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropdown button
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
    <a class="dropdown-item" href="#">Something else here</a>
  </div>
</div>
//   </div> 
  : ''
  }
  {/* {activities.map(({id, routineActivityId, name, description, count, duration}))} */}

</div>
            <div className="form-group">
            <label >Name</label>
            <input type="email" className="form-control" value={activityName} onChange={(e) => {setActivityName(e.target.value)}}></input>
            </div>
            <div className="form-group">
            <label >Description</label>
            <input type="email" className="form-control" value={activityDescription} onChange={(e) => {setActivityDescription(e.target.value)}}></input>
            <input type="email" className="form-control" value={count} onChange={(e) => {setCount(e.target.value)}}></input>
            <input type="email" className="form-control" value={duration} onChange={(e) => {setDuration(e.target.value)}}></input>
            <button type="submit" className="btn btn-primary" onClick={handleCreateActivity}>Submit</button>
            </div>
        </form>
         : " "
    }
                        </div>
                    </div>
                </div>
            </div>
)}
    
    </div></>)
};

export default MyRoutines;

