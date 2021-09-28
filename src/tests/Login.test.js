import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './utils/utils';

describe('Testes Login.jsx', () => {
  const inputEmailId = 'email-input';
  const inputPasswordId = 'password-input';
  const buttonId = 'login-submit-btn';
  const email = 'email@mail.com';
  test('ao entrar na página contém todos os elementos data-testid especificos', () => {
    renderWithRouter(
      <App />,
    );
    expect(screen.getAllByTestId(inputEmailId));
    expect(screen.getAllByTestId(inputPasswordId));
    expect(screen.getAllByTestId(buttonId));
  });
  test('ao entrar na página o botão está desabilitado', () => {
    renderWithRouter(
      <App />,
    );
    const button = screen.getByTestId(buttonId);
    expect(button).toBeDisabled();
  });
  test('o botão é habilitado ao receber um email e senha especificos', () => {
    renderWithRouter(
      <App />,
    );
    const input = screen.getByTestId(inputEmailId);
    const password = screen.getByTestId(inputPasswordId);
    const button = screen.getByTestId(buttonId);
    fireEvent.change(input, { target: { value: email } });
    fireEvent.change(password, { target: { value: '1234567' } });
    expect(button).not.toBeDisabled();
  });
  test('ao clicar no botão ele salva o email no localStorage e redireciona a pag', () => {
    const { history } = renderWithRouter(<App />);
    const input = screen.getByTestId(inputEmailId);
    const password = screen.getByTestId(inputPasswordId);
    const button = screen.getByTestId(buttonId);
    fireEvent.change(input, { target: { value: email } });
    fireEvent.change(password, { target: { value: '1234567' } });
    userEvent.click(button);
    localStorage.setItem('user', email);
    history.push('/comidas');
    expect(localStorage.getItem('user')).toBe(email);
    expect(history.location.pathname).toBe('/comidas');
  });
});
