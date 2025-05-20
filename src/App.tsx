import './App.css'
import { useState } from 'react';
import TodoItem from './components/TodoItem';

type Todo = {
  id: number;
  text: string;
};
/* TODO:combine types used here and in the TodoItem */

function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Buy milk' },
    { id: 2, text: 'Write code' },
  ]);

  const [input, setInput] = useState('');

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos(prev => [
      ...prev,
      { id: Date.now(), text: input.trim() },
    ]);
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
      {todos ? (
        <ul>
        {todos.map(todo => (
          <TodoItem key={todo.id} text={todo.text} />
        ))}
      </ul>
      ) : (
        <p>No todos</p>
      )}
    </div>
  )
}

export default App
