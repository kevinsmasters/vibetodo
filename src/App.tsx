import './App.css'

const todos = [
  { id: 1, text: 'Buy milk' },
  { id: 2, text: 'Write code' },
];

function App() {

  return (
    <div>
      <h1>Todo List</h1>
      {todos ? (
        <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
      ) : (
        <p>No todos</p>
      )}
    </div>
  )
}

export default App
