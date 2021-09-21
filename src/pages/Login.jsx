import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <Input
        type="email"
        testid="email-input"
        value={ email }
        onChange={ ({ target }) => setEmail(target.value) }
      />

      <Input
        type="text"
        testid="password-input"
        value={ password }
        onChange={ ({ target }) => setPassword(target.value) }
      />

      <Button testid="login-submit-btn" />
    </div>
  );
}

export default Login;
