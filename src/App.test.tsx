import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders an empty todo list message', () => {
  render(<App initialTodos={[]} />);
  expect(screen.getByText(/no todos/i)).toBeInTheDocument();
});

test('renders the todo list', () => {
  render(
    <App
      initialTodos={[
        { id: 1, text: 'Buy milk' },
        { id: 2, text: 'Write code' },
      ]}
    />);

  const list = screen.getByRole('list'); // <ul> has role="list"

  expect(list).toBeInTheDocument();

  const items = screen.getAllByRole('listitem'); // <li> has role="listitem"

  expect(items).toHaveLength(2);
  expect(screen.getByText('Buy milk')).toBeInTheDocument();
});

test('allows user to add a new todo', async () => {
  render(
    <App
      initialTodos={[]}
    />
  );

  const input = screen.getByPlaceholderText(/add a new todo/i);
  const button = screen.getByRole('button', { name: /add/i });

  await userEvent.type(input, 'Walk the dog');
  await userEvent.click(button);

  // Now it should be in the list
  expect(screen.getByText('Walk the dog')).toBeInTheDocument();
});

test('allows user to mark a todo as completed', async () => {
  render(
    <App
      initialTodos={[
        { id: 1, text: 'Buy milk' },
      ]}
    />
  );

  const checkbox = screen.getByRole('checkbox', { name: /buy milk/i });
  expect(checkbox).not.toBeChecked();

  await userEvent.click(checkbox);

  expect(checkbox).toBeChecked();
  const item = screen.getByText('Buy milk');
  expect(item).toHaveStyle('text-decoration: line-through');
});

test('allows user to delete a todo', async () => {
  render(
    <App
      initialTodos={[
        { id: 1, text: 'Buy milk' },
        { id: 2, text: 'Write code' },
      ]}
    />
  );

  // Ensure both todos are in the list
  expect(screen.getByText('Buy milk')).toBeInTheDocument();
  expect(screen.getByText('Write code')).toBeInTheDocument();

  // Click the delete button for 'Buy milk'
  const deleteButton = screen.getByRole('button', { name: /delete buy milk/i });
  await userEvent.click(deleteButton);

  // 'Buy milk' should be removed
  expect(screen.queryByText('Buy milk')).not.toBeInTheDocument();
  expect(screen.getByText('Write code')).toBeInTheDocument();
});
