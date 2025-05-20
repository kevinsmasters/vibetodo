import './App.css'
import { useState } from 'react';
import TodoItem from './components/TodoItem';

type Todo = {
  id: number;
  text: string;
  completed?: boolean;
};

type AppProps = {
  initialTodos?: Todo[];
};

function App({ initialTodos = [] }: AppProps) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const [input, setInput] = useState('');

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos(prev => [
      ...prev,
      { id: Date.now(), text: input.trim(), completed: false },
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
      {todos.length > 0 ? (
        <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            text={todo.text}
            completed={todo.completed ?? false}
            onToggle={() =>
              setTodos(prev => 
                prev.map(t =>
                  t.id === todo.id ? { ...t, completed: !t.completed } : t
                )
              )
            }
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
