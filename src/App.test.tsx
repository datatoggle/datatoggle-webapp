import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', async () => {
  render(<App/>);
  // use find By because we need to wait for firebase.auth async check
  const linkElement = await screen.findByText("Log Into My Account");
  expect(linkElement).toBeInTheDocument();
});
