import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders an empty todo list message', () => {
  render(<App />);
  expect(screen.getByText(/no todos/i)).toBeInTheDocument();
});