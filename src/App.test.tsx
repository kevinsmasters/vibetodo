import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test.skip('renders an empty todo list message', () => {
  render(<App />);
  expect(screen.getByText(/no todos/i)).toBeInTheDocument();
});

test('renders the todo list', () => {
  render(<App />);

  const list = screen.getByRole('list'); // <ul> has role="list"

  expect(list).toBeInTheDocument();

  const items = screen.getAllByRole('listitem'); // <li> has role="listitem"

  expect(items).toHaveLength(2);
  expect(screen.getByText('Buy milk')).toBeInTheDocument();
});

test('allows user to add a new todo', async () => {
  render(<App />);

  const input = screen.getByPlaceholderText(/add a new todo/i);
  const button = screen.getByRole('button', { name: /add/i });

  await userEvent.type(input, 'Walk the dog');
  await userEvent.click(button);

  // Now it should be in the list
  const items = screen.getAllByRole('listitem');
  expect(items.map((li) => li.textContent)).toContain('Walk the dog');
});
