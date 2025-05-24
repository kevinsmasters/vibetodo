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
    <div className="bg-gray-200 py-8">
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <div className="mb-4">
            <h1 className="text-gray-darkest">
              Todo List
            </h1>
          </div>
          <div className="flex mt-4">
            <input
              placeholder="Add a new todo"
              value={input}
              onChange={e => setInput(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
            />
            <button 
              onClick={addTodo}
              className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal"  
            >Add</button>
          </div>
          <div>
            <button
              className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal"
              onClick={() => dispatch({ type: 'TOGGLE_ALL' })}
              >
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
      </div>
    </div>
    
  )
}

export default App
