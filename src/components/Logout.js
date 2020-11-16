import React from 'react';
import { setToken } from '../api';

const Logout = () => {
    localStorage.clear();
    setToken('');
    location.href = "/home/";
    <SweetAlert
  title="You are now logged out!"
  onConfirm={this.onConfirm}
  onCancel={this.onCancel}
  btnSize="sm"
/>
}

export default Logout;