import React, {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import { getToken, setToken, fetchUserData } from '../api';
import Logout from './Logout';

const NavBar = (props) => {
    const {token, setToken, userData, setUserData} = props;
    const [username, setUsername] = useState({});

    // const userFetchUserData = async () => {
    //         fetchUserData().then(response => setUserData(response)).catch(error => console.log(error))
    //         // setUserData(userData)
    //         console.log('userData', userData);
    // }

    useEffect(() => {
        const token = getToken();
        if(token){
            setToken(token) ;
        } 
        fetchUserData().then(setUserData)
        console.log('userData',userData)
    }, []);

    return (
        <div>
        {token ? 
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">Fitness Trackr</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link" href="/home">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/routines">Routines</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/myroutines">My Routines</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/activities">Activities</a>
                            </li>
                            <li className="nav-item">
                            <a className="navbar-brand" href="#">Hi {userData.username}</a>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-primary" onClick={Logout}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
 : 
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">Fitness Trackr</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link" href="/home">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/routines">Routines</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/activities">Activities</a>
                            </li>
                        </ul>

                        <div className="justify-content-end">
                            <a className="btn btn-light my-2 my-sm-0" href="/login">Login</a>
                            <a className="btn btn-light my-2 my-sm-0" href="/register">Register</a> 
                        </div>
                    </div>
                </nav>
            </div>
}
        </div> 

    )
};

export default NavBar;