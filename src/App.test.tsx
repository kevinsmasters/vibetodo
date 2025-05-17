import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders an empty todo list message', () => {
  render(<App />);
  expect(screen.getByText(/no todos/i)).toBeInTheDocument();
});

test('renders the todo list', () => {
  const list = screen.getByRole('list'); // <ul> has role="list"

  expect(list).toBeInTheDocument();

  const items = screen.getAllByRole('listitem'); // <li> has role="listitem"

  expect(items).toHaveLength(2);
  expect(screen.getByText('Buy milk')).toBeInTheDocument();
})