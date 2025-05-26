import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TodoItem from './TodoItem';

test('renders a todo item with text', () => {
  render(
    <TodoItem
      text="Buy milk"
      completed={false}
      onToggle={()=> (false)}
      onDelete={()=> (false)}
    />);
  expect(screen.getByText('Buy milk')).toBeInTheDocument();
});