import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Searching for Wallet message', () => {
  render(<App />);
  const linkElement = screen.getByText(/Searching for Wallet/i);
  expect(linkElement).toBeInTheDocument();
});
