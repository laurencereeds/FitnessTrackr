import React, { useState } from 'react';
import { register, setToken } from '../api';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (event) => {
                event.preventDefault();
        if (password.length < 8 ){
            setPassword('')
            swal({
                title: "Oh la la!",
                text: "Password needs to be at least 8 characters long. Please try again with a different username and password combinaison",
                icon: "error",
                button: "Try again",
                }); 
            return
        }
        try {
            event.preventDefault();
            const result = await register(username, password);
            if (result.error) {
                setUsername('')
                setPassword('')
                swal({
                    title: "Oh la la!",
                    text: "Username already taken please try again",
                    icon: "error",
                    button: "Try again",
                  });
            } else {
                setToken(result.token);
                if (result.user && result.user.username) {
                    setUsername(result.user.username);
                    location.href = "/home/"
                    swal({
                        title: "Success",
                        text: "You successfully created an account!",
                        icon: "success",
                      });
                }
            }
            } catch(error) {
            console.error(error)
        } 
}
    return (
  <div className="form-signup">
      <form id="cover" onSubmit={handleRegister}>
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

export default Register;