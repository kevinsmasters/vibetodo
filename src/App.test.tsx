import { test, expect, beforeEach, describe } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// TODO: clean up and organize older tests
describe('App with localStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders an empty todo list message', () => {

    render(<App />);
    expect(screen.getByText(/no todos/i)).toBeInTheDocument();
  });

  test('toggles all todos as completed', async () => {
    const user = userEvent.setup();

    const mockTodos = [
      { id: 1, text: 'One', completed: false },
      { id: 2, text: 'Two', completed: false },
    ];
    localStorage.setItem('todos', JSON.stringify(mockTodos));

    render(<App />);

    const toggleAllButton = screen.getByRole('button', { name: /toggle all/i });
    await user.click(toggleAllButton);

    await waitFor(async () => {
      const listItems = screen.findAllByRole('listitem');
      (await listItems).forEach(item => {
        const label = item.querySelector('label')
        expect(label).toHaveStyle('text-decoration: line-through');
      });
    });
  });


  test('loads todos from localStorage on initial render', () => {
    const mockTodos = [
      { id: 1, text: 'Test localStorage', completed: false },
    ];
    localStorage.setItem('todos', JSON.stringify(mockTodos));

    render(<App />);

    expect(screen.getByText('Test localStorage')).toBeInTheDocument();
  });

  test('allows user to add a new todo', async () => {
    const mockTodos = [
      { id: 1, text: 'Test localStorage', completed: false },
    ];
    localStorage.setItem('todos', JSON.stringify(mockTodos));

    render(<App />);

    const input = screen.getByPlaceholderText(/add a new todo/i);
    const button = screen.getByRole('button', { name: /add/i });

    await userEvent.type(input, 'Walk the dog');
    await userEvent.click(button);

    // Now it should be in the list
    expect(screen.getByText('Walk the dog')).toBeInTheDocument();
  });

  test('allows user to mark a todo as completed', async () => {
    const mockTodos = [
      { id: 1, text: 'Buy milk', completed: false },
    ];
    localStorage.setItem('todos', JSON.stringify(mockTodos));

    render(<App />);

    const checkbox = screen.getByRole('checkbox', { name: /buy milk/i });
    expect(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    const item = screen.getByText('Buy milk');
    expect(item).toHaveStyle('text-decoration: line-through');
  });

  test('allows user to delete a todo', async () => {
    const mockTodos = [
      { id: 1, text: 'Buy milk', completed: false },
      { id: 2, text: 'Write code', completed: false },
    ];
    localStorage.setItem('todos', JSON.stringify(mockTodos));

    render(<App />);

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

  test('saves todos to localStorage when updated', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /add/i });

    await user.type(input, 'Save me');
    await user.click(button);

    const stored = JSON.parse(localStorage.getItem('todos') || '[]');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(stored.some((t: any) => t.text === 'Save me')).toBe(true);
  });
})
