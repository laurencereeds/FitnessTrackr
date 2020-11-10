import React from 'react';
import { setToken } from '../api';

const Logout = () => {
    localStorage.clear();
    setToken('');
}

export default Logout;