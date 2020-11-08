import React, {useState} from 'react';
import { login, setToken } from '../api';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        try {
            event.preventDefault();
            console.log('username', username);
            const result = await login(username, password);
            console.log('result', result);
            if (result) {
                setToken(result.token);
                console.log('test');
                if (result.user && result.user.username) {
                    setUsername(result.user.username);
                }
            } else {
                console.error('Nope')
                //use of swal here
            }

            } catch(error) {
            console.error(error)
        } 
}
    return (
  <div>
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
