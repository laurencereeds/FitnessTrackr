import React, {useEffect} from 'react';
import {fetchActivities, setToken, getToken} from '../api';

const Activities = (props) => {
    const { activities, setActivities, token, setToken} = props;
    useEffect( () => {
        fetchActivities().then(setActivities)
        console.log('activities', activities);
        // const token = getToken();
        // if(token){
        //     setToken(token) ;
        // }  
 
    },[])
    
    return (<>
    { 
    // token ?
   <div>
    <button type="button" class="btn btn-primary btn-lg btn-block">Create Activity</button>
    
    {activities && activities.map(({id, name, description}) => 
    <div key={id}
    className="row">
    <div className="col-sm-6">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{description}</p>
          <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
  </div>
    )}
    </div>

//     :
    
//     activities && activities.map(({id, name, description}) => 
//     <div key={id}
//     className="row">
//     <div className="col-sm-6">
//       <div className="card">
//         <div className="card-body">
//           <h5 className="card-title">{name}</h5>
//           <p className="card-text">{description}</p>
//           <a href="#" className="btn btn-primary">Go somewhere</a>
//         </div>
//       </div>
//     </div>
//   </div>
//     )
    }
    </>)
};

export default Activities;