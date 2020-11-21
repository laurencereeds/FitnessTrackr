export const API_URL = 'https://fitnesstrac-kr.herokuapp.com';


export function setToken(token) {
    localStorage.setItem('token', token);
}

export function getToken() {
    return localStorage.getItem('token');
}

export function makeHeaders() {
    if (getToken()) {
        return {'Content-Type': 'Application/JSON',
        'Authorization': `Bearer ${getToken()}`}
    } else {
        return {'Content-Type': 'Application/JSON'}
    }
}

export async function register(username, password) {
    try {
        const response = await fetch(`${API_URL}/api/users/register`, {
          method: "POST",
          headers: makeHeaders(),
          body: JSON.stringify({
              username,
              password
            })
          })
          const responseObj = await response.json();
      
          if (responseObj && responseObj.token) {
          setToken(responseObj.token); 
        }  
        return responseObj;
        } catch(error){
          console.error(error);
        }
}

export async function login(username, password) {
    try {
        const response = await fetch(`${API_URL}/api/users/login`, {
            method: "POST",
            headers: makeHeaders(),
            body: JSON.stringify({
                    username,
                    password
            })
        })
        const responseObj = await response.json();
        if (responseObj && responseObj.token) {
        setToken(responseObj.token);
        }
        return responseObj;
    } catch(error){
        console.error(error);
    }
}

export async function fetchUserData() {
    try {
        const response = await fetch(`${API_URL}/api/users/me`, {
            method: "GET",
            headers: makeHeaders()
        })
        const responseObj = await response.json();
        return responseObj;
    } catch(error) {
        console.error(error)
    }
}

export async function fetchRoutinesByUser(username) {
    try {
        const response = await fetch(`${API_URL}/api/users/${username}/routines`, {
            method: 'GET',
            headers: makeHeaders()
        })
        const responseObj = await response.json();
        return responseObj;
    } catch(error) {
        console.error(error)
    }
}

export async function fetchActivities() {
    try{
        const response = await fetch(`${API_URL}/api/activities`, {
            method: 'GET',
            headers: makeHeaders()
        })
        const responseObj = await response.json();
        return responseObj
    } catch(error) {
      console.error(error)
    }
}

export async function createActivity(name, description) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    try {
        const response = await fetch(`${API_URL}/api/activities`, {
            method: 'POST',
            headers: makeHeaders(),
            body: JSON.stringify({
                name,
                description
            })
        })
        const responseObj = await response.json();
        return responseObj;
    } catch(error) {
        console.error(error)
    }
}

export async function editActivity(activityId, name, description) {
    try {
        const response = await fetch(`${API_URL}/api/activities/${activityId}`, {
            method: 'PATCH',
            headers: makeHeaders(),
            body: JSON.stringify({
                name,
                description
            })
        })
        const responseObj = await response.json();
        return responseObj;
    } catch(error) {
        console.error(error)
    }
}

export async function fetchRoutineActivities(routineId) {
    try {
        const response = await fetch(`${API_URL}/api/activities/${routineId}/routines`, {
            method: 'GET',
            headers: makeHeaders()
        })
        const responseObj = await response.json();
        return responseObj;
    } catch(error) {
        console.error(error)
    }
}

export async function fetchRoutines() {
    try {
        const response = await fetch(`${API_URL}/api/routines`, {
            method: 'GET',
            headers: makeHeaders()
        })
        const responseObj = await response.json();
        return responseObj
    } catch(error) {
        console.error(error)
    }
}

export async function createRoutine(name, goal, isPublic) {
    try {
        const response = await fetch(`${API_URL}/api/routines`, {
            method: 'POST',
            headers: makeHeaders(),
            body: JSON.stringify({
                name,
                goal,
                isPublic
            })
        })
        const responseObj = await response.json();
        return responseObj;
    } catch(error) {
        console.error(error)
    }
}

export async function editRoutine(routineId, name, goal) {
    try {
        const response = await fetch(`${API_URL}/api/routines/${routineId}`, {
            method: 'PATCH',
            headers: makeHeaders(),
            body: JSON.stringify({
                name,
                goal
            })
        })
        const responseObj = await response.json();
        return responseObj;
    } catch(error) {
        console.error(error)
    }
}

export async function deleteRoutine(routineId) {
    try {
        const response = await fetch(`${API_URL}/api/routines/${routineId}`, {
            method: 'DELETE',
            headers: makeHeaders()
        })
        const responseObj = await response.json();
        return responseObj;
    } catch(error) {
        console.error(error)
    }
}

export async function createRoutineActivity(routineId, activityId, count, duration) {
    try {
        const response = await fetch(`${API_URL}/api/routines/${routineId}/activities`, {
            method: 'POST',
            headers: makeHeaders(),
            body: JSON.stringify({
                activityId,
                count,
                duration
            })
        })
        const responseObj = await response.json();
        return responseObj;
    } catch(error) {
        console.error(error)
    }
}

export async function editRoutineActivity(routineActivityId, count, duration) {
    try {
        const response = await fetch(`${API_URL}/api/routine_activities/${routineActivityId}`, {
            method: 'PATCH',
            headers: makeHeaders(),
            body: JSON.stringify({
                count,
                duration
            })
        })
        const responseObj = await response.json();
        return responseObj;
    } catch(error) {
        console.error(error)
    }
}

export async function deleteRoutineActivity(routineActivityId) {
    try {
        const response = await fetch(`${API_URL}/api/routine_activities/${routineActivityId}`, {
            method: 'DELETE',
            headers: makeHeaders()
        })
        const responseObj = await response.json();
        return responseObj;
    } catch(error) {
        console.error(error)
    }
}