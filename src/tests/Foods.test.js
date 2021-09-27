import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './utils/utils';

describe('Teste Foods.jsx', () => {
  test('verifica se ao entrar na página contém um h2 com o name "Comidas"', () => {
    const { history } = renderWithRouter(
      <App />,
    );
    history.push('/comidas');
    expect(screen.getByRole('heading', {
      level: 2,
      name: /Comidas/,
    })).toBeInTheDocument();
  });
});
