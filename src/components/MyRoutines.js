import React, {useEffect, useState} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';
import {fetchRoutinesByUser, fetchUserData, createRoutine, deleteRoutine, createRoutineActivity, editRoutine} from '../api';

const MyRoutines = (props) => {
    const { userData, setUserData, allActivities, setAllActivities } = props;
    const [myRoutines, setMyRoutines] = useState([]);
    const [isActive, setIsActive] = useState(false)
    const [isEditActive, setEditIsActive] = useState(false)
    const [name, setName]= useState('');
    const [goal, setGoal]= useState('');
    const [isPublic, setIsPublic]= useState(false);
    const [activityIsActive, setActivityIsActive] = useState('');
    const [activityName, setActivityName] = useState('');
    const [activityDescription, setActivityDescription] = useState('');
    const [count, setCount] = useState('');
    const [duration, setDuration] = useState('');
    const [dropDown, setDropDownIsActive] = useState(false);
    const [isDropdownOpen,setDropdown] = useState(false);

    console.log('userDataMyRoutines', userData.username)

    let history = useHistory();
    // const [myInfo, setMyInfo] = useState({});

    // const handleSetUp = async () => {
    //     try {
            //  fetchUserData(setMyInfo).then(data => fetchRoutinesByUser(data.username))
            //  console.log('myRoutines', myRoutines)
            // fetchUserData().then(setMyInfo)
            // console.log('myInfo', myInfo)
            // fetchRoutinesByUser(userData.username).then(setMyRoutines)
            // console.log('myRoutines', myRoutines)
            // fetchRoutinesByUser(userData.username).then(setMyRoutines);
            // fetchRoutinesByUser(userData.username).then(response => setMyRoutines(response)).catch(error => console.log(error))
            // console.log('myRoutines', myRoutines);


            //  const userInfo = await fetchUserData(setMyInfo)
            //  setMyInfo(myInfo)
            //  console.log('myInfo.username', myInfo)
            //  const data = await fetchRoutinesByUser(myInfo.username).then(setMyRoutines)
            // const userRoutines = fetchRoutinesByUser(userInfo.username).then(response => setMyRoutines(response)).catch(error => console.log(error))
            // setMyRoutines(userRoutines)
            // console.log('userRoutine', userRoutines)
            // console.log('routines', myRoutines);  

            // console.log('result', data) 
    //     } catch(error) {
    //         console.error(error)
    //     }
    // }

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

    const handleDeleteRoutine = async (routineId) => {
        try {
            const result = await deleteRoutine(routineId)
            // console.log('myRoutines.id', myRoutines.id)
            // console.log('resultDelete', result)

        } catch(error) {
            console.error(error)
        }
    }

    const handledeleteRoutineActivity = async (routineActivityId) => {
        try {

        } catch(error) {
            console.error(error)
        }
    }

    const handleEditRoutine = async (routineId, name, goal) => {
        try {
            const result = await editRoutine(routineId, name, goal)
            console.log('result', result)

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
    // fetchRoutinesByUser(userData.username).then(response => setMyRoutines(response)).catch(error => console.log(error))
    fetchRoutinesByUser('petitpied').then(setMyRoutines)
    console.log('myRoutines', myRoutines)
    },[])

    return (<>

    <button type="button" className="btn btn-primary btn-lg btn-block" onClick={ setIsActive}>Create Routine</button>

    { isActive ? 
        <form className="activityForm">
            <div className="form-group">
            <label >Name</label>
            <input type="text" className="form-control" value={name} onChange={(e) => {setName(e.target.value)}}></input>
            </div>
            <div className="form-group">
            <label >Description</label>
            <input type="text" className="form-control" value={goal} onChange={(e) => {setGoal(e.target.value)}}></input>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value={isPublic} onClick={() => setIsPublic(true)}></input>
                <label className="form-check-label" for="defaultCheck1">
                    Is Public
                </label>
            </div>

            <div>
            <button type="submit" className="btn btn-primary" onClick={ handleCreateRoutine}>Submit</button>
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
                            <p className="card-text">Activities:{activities}</p>
                            <div>
                            <a href="#" className="btn btn-danger" onClick={() => handleDeleteRoutine(id)} >Delete</a>
                            </div>
                            <div>
                            <a href="#" className="btn btn-secondary" onClick={setEditIsActive}>Edit</a>
                            </div>
                            { isEditActive ? 
                                    <form className="activityForm">
                                    <div className="form-group">
                                    <label >Name</label>
                                    <input type="text" className="form-control" value={name} onChange={(e) => {setName(e.target.value)}}>{name}</input>
                                    </div>
                                    <div className="form-group">
                                    <label >Description</label>
                                    <input type="text" className="form-control" value={goal} onChange={(e) => {setGoal(e.target.value)}}>{goal}</input>
                                    </div>
                                    <div className="form-check">
                                    </div>
                                    <div>
                                    <button type="submit" className="btn btn-primary" onClick={ handleCreateRoutine}>Submit</button>
                                    </div>
                                </form>
                            : '' }
                            <div>
                            <button type="button" className="btn btn-primary" onClick={() => setActivityIsActive(true)}>Add Activity</button>
                            </div>
                        
                            { activities.map(({id, routineActivityId, name, description, count, duration}) => {
              return<div key={routineActivityId} className="card">
                    <div className="card-body">
                        <h4>Activity</h4>
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text">Count: {count}</p>
                        <p className="card-text">Duration: {duration} min</p>
                        <a href="#" className="btn btn-danger" onClick={() => handledeleteRoutineActivity(id)}>Delete</a>
                    </div>
                </div>
          })}
              { activityIsActive ? 
        <form className="activityForm">
        <div className="btn-group">
  {/* <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Available Activities
  </button>
  {dropDown ?  */}
    {/* // <div className="dropdown-menu show" >
    // <a className="dropdown-item" href="#">Action</a>
    // <a className="dropdown-item" href="#">Another action</a>
    // <a className="dropdown-item" href="#">Something else here</a>
    // <div className="dropdown-divider"></div>
    // <a className="dropdown-item" href="#">Separated link</a>
//     <div className="dropdown">
//   <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={setDropdown(!isDropdownOpen)}>
//     Dropdown button
//   </button>
//   <div className={classnames('dropdown-menu bg-dark dropdown-userdata', {'show': isDropdownOpen})}>
//     <a className="dropdown-item" href="#">Action</a>
//     <a className="dropdown-item" href="#">Another action</a>
//     <a className="dropdown-item" href="#">Something else here</a>
//   </div>
// </div>
//   </div>  */}
{/* <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    Dropdown Button
  </Dropdown.Toggle>
{}
  <Dropdown.Menu>{
      allActivities.map(activity => (
              <Dropdown.Item key={activity.id} value={activity.id}>{activity.name}
              </Dropdown.Item>
      ))}


  </Dropdown.Menu>
</Dropdown> */}
  {/* : ''
  } */}
  {/* {activities.map(({id, routineActivityId, name, description, count, duration}))} */}

</div>
            <div className="form-group">
            <label >Name</label>
            <input type="email" className="form-control" value={activityName} onChange={(e) => {setActivityName(e.target.value)}}></input>
            </div>
            <div className="form-group">
            <label >Description</label>
            <input type="email" className="form-control" value={activityDescription} onChange={(e) => {setActivityDescription(e.target.value)}}></input>
            <label >Count</label>
            <input type="email" className="form-control" value={count} onChange={(e) => {setCount(e.target.value)}}></input>
            <label >Duration</label>
            <input type="email" className="form-control" value={duration} onChange={(e) => {setDuration(e.target.value)}}></input>
            <div>
                <button type="submit" className="btn btn-primary" onClick={handleCreateActivity}>Submit</button>
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
    
    </div></>)
};

export default MyRoutines;

