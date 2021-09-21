import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';

function Login() {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  }); // Criei um estado local, porque ainda não tem nada sobre estado global.
  const [enableButton, setEnable] = useState(true); // o botão tem que estar desabilitado caso as validações do email e senha não passem, então criei um estado, foi a maneira que consegui.

  function handleButtonLogin() { // valida o email e a senha
    const emailPath = /^[^\s@]+@[^\s@]+\.[^\s@]+$/g; // regex retirado de projetos anteriores.
    const MIN_LENGTH_PSSW = 6;
    if (emailPath.test(login.email) && login.password.length >= MIN_LENGTH_PSSW) {
      setEnable(false);
    }
  }

  return (
    <div>
      <Input
        type="email"
        testid="email-input"
        value={ login.email }
        onChange={ ({ target }) => {
          setLogin({ ...login, email: target.value });
          handleButtonLogin(); // chamei ela no onChange do email e da senha porque não sabia onde chamar.
        } }
      />

      <Input
        type="text"
        testid="password-input"
        value={ login.password }
        onChange={ ({ target }) => {
          setLogin({ ...login, password: target.value });
          handleButtonLogin();
        } }
      />

      <Button testid="login-submit-btn" disabled={ enableButton } />
    </div>
  );
}

export default Login;
