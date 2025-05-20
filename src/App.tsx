import './App.css'
import { useReducer, useState } from 'react';
import TodoItem from './components/TodoItem';
import { todoReducer } from './todoReducer';
import type { Todo } from './todoReducer';

type AppProps = {
  initialTodos?: Todo[];
};

function App({ initialTodos = [] }: AppProps) {
  const [todos, dispatch] = useReducer(todoReducer, initialTodos);
  const [input, setInput] = useState('');

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
