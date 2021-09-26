import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Button from '../components/Button';
import Input from '../components/Input';

function Login() {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  }); // Criei um estado local, porque ainda não tem nada sobre estado global.
  const [enableButton, setEnable] = useState(true); // o botão tem que estar desabilitado caso as validações do email e senha não passem, então criei um estado, foi a maneira que consegui.
  const history = useHistory(); // só jogando o hook useHistory em uma constante pra pegar o histórico
  useEffect(() => {
    function handleValidation() { // valida o email e a senha
      const emailPath = /^[^\s@]+@[^\s@]+\.[^\s@]+$/g; // regex retirado de projetos anteriores.
      const MIN_LENGTH_PSSW = 6;
      if (emailPath.test(login.email) && login.password.length >= MIN_LENGTH_PSSW) {
        setEnable((prevState) => !prevState);
      }
    }
    handleValidation();
  }, [login.email, login.password]);
  function handleButtonLogin() {
    const user = {
      email: login.email,
    };
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    history.push('/comidas'); // redirecionando pra página de comidas
  }

  return (
    <div>
      <Input
        type="email"
        testid="email-input"
        value={ login.email }
        onChange={ ({ target }) => {
          setLogin({ ...login, email: target.value });
        } }
      />

      <Input
        type="password"
        testid="password-input"
        value={ login.password }
        onChange={ ({ target }) => {
          setLogin({ ...login, password: target.value });
        } }
      />

      <Button
        testid="login-submit-btn"
        disabled={ enableButton }
        onClick={ handleButtonLogin }
        label="Entrar"
      />
    </div>
  );
}

export default Login;
