import { expect, test } from 'vitest';
import { todoReducer } from './todoReducer';
import type { Todo } from './todoReducer';

const initialTodos: Todo[] = [
  { id: 1, text: 'Buy milk', completed: false },
  { id: 2, text: 'Write code', completed: true },
];

test('adds a new todo', () => {
  const action = { type: 'ADD_TODO' as const, payload: 'Walk dog' };
  const result = todoReducer([], action);
  expect(result).toHaveLength(1);
  expect(result[0]).toMatchObject({ text: 'Walk dog', completed: false });
});

test('toggles the completed status of a todo', () => {
  const action = { type: 'TOGGLE_TODO' as const, payload: 1 };
  const result = todoReducer(initialTodos, action);
  expect(result[0].completed).toBe(true); // flipped from false to true
});

test('deletes a todo by id', () => {
  const action = { type: 'DELETE_TODO' as const, payload: 2 };
  const result = todoReducer(initialTodos, action);
  expect(result).toHaveLength(1);
  expect(result[0].id).toBe(1);
});

test('toggles all todos', () => {
  const action = { type: 'TOGGLE_ALL' as const };
  const result = todoReducer(initialTodos, action);
  expect(result[0].completed).toBe(true);
  expect(result[1].completed).toBe(true);
});
