import React, { useState } from 'react';
import swal from 'sweetalert';
import { login, setToken } from '../api';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        try {
            event.preventDefault();
            const result = await login(username, password);
            if (result) {
                setToken(result.token);
                if (result.user && result.user.username) {
                    setUsername(result.user.username);
                    location.href = "/home/";
                    swal({
                        title: "Success",
                        text: "You are now logged in!",
                        icon: "success",
                      });
                }
            } else {
                swal({
                    title: "Oh la la!",
                    text: "Username or password is incorrect",
                    icon: "error",
                    button: "Try again",
                  });
            }
            } catch(error) {
            console.error(error)
        } 
}
    return (
  <div className="form-signin">
      <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" value={username} onChange={(e) => {setUsername(e.target.value)}} /> 
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="text" value={password} onChange={(e) => {setPassword(e.target.value)}} />  
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
      </form>
  </div>
        )
    }

export default Login;
