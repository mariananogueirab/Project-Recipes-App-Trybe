import React from 'react';
import Button from '../components/Button';
import Input from '../components/Input';

function Login() {
  return (
    <div>
      <Input
        type="email"
        testid="email-input"
        /* value={}
        onChange={} */
      />

      <Input
        type="text"
        testid="password-input"
        /* value={}
        onChange={} */
      />

      <Button testid="login-submit-btn" />
    </div>
  );
}

export default Login;
