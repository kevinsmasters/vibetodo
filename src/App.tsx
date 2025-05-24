import './App.css'
import { useEffect, useReducer, useState } from 'react';
import TodoItem from './components/TodoItem';
import { todoReducer } from './todoReducer';
import { loadTodos, saveTodos } from './storage';

function App() {
  const [todos, dispatch] = useReducer(todoReducer, [], loadTodos);
  const [input, setInput] = useState('');

  useEffect(() => {
    saveTodos(todos);
  }, [todos])

  const addTodo = () => {
    if (!input.trim()) return;
    dispatch({ type: 'ADD_TODO', payload: input.trim() });
    setInput('');
  }
  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          placeholder="Add a new todo"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <div>
        <button onClick={() => dispatch({ type: 'TOGGLE_ALL' })}>
          Toggle All
        </button>
      </div>
      {todos.length > 0 ? (
        <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            text={todo.text}
            completed={todo.completed ?? false}
            onToggle={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
            onDelete={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}
          />
        ))}
      </ul>
      ) : (
        <p>No todos</p>
      )}
    </div>
  )
}

export default App
