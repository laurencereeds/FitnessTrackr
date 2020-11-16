import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';
import { fetchActivities, getToken, createActivity } from '../api';

const Activities = (props) => {
    const { token, setToken, allActivities, setAllActivities} = props;
    const [isActive, setIsActive] = useState(false);
    const [name, setName]= useState('');
    const [description, setDescription]= useState('');
    let history = useHistory();

    useEffect( () => {
        fetchActivities().then(response => setAllActivities(response)).catch(error => console.log(error))
        const token = getToken();
        if(token){
            setToken(token) ;
        }
    },[])

    const handleCreateActivity = async () => {
        try {
            event.preventDefault();
            const result = await createActivity(name, description);
            if (result.error) {
                swal({
                    title: "Oh no!",
                    text: "An activity with this name already exists",
                    icon: "warning",
                    button: "Oh la la!",
                  });
            } else {
            history.push("/activities");
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
 
    return (<>
    { 
    token ?
   <div>
      <button type="button" className="btn btn-primary btn-lg btn-block" onClick={setIsActive}>Create Activity</button>
      <div className="container">
      { isActive ? 
          <form className="activityForm">
              <div className="form-group">
                <label >Name</label>
                <input type="email" className="form-control" value={name} onChange={(e) => {setName(e.target.value)}}></input>
              </div>
              <div className="form-group">
                <label >Description</label>
                <input type="email" className="form-control" value={description} onChange={(e) => {setDescription(e.target.value)}}></input>
              <button type="submit" className="btn btn-primary" onClick={handleCreateActivity}>Submit</button>
              </div>
          </form>
          : " "
      }
      </div>
      <div className="container">
          <h1>Activities</h1>

          {allActivities && allActivities.map(({id, name, description}) => 
            <div key={id}
            className="row">
            <div className="col-sm-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{name}</h5>
                  <p className="card-text">{description}</p>
                </div>
              </div>
            </div>
          </div>
            )}
      </div>

      </div>
      :
      allActivities && allActivities.map(({id, name, description}) => 
      <div className="container">
          <div key={id}
          className="row justify_content-center">
          <div className="col-3 mr-auto">
            <div className="card card-body mb-2">
              <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{description}</p>
              </div>
            </div>
          </div>
        </div>
    </div>
    )}
  </>)
};

export default Activities;