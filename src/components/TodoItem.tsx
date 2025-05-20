type TodoItemProps = {
  text: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
};

const TodoItem = ({ text, completed, onToggle, onDelete }: TodoItemProps) => {
  return (
    <li>
      <label style={{ textDecoration: completed ? 'line-through' : 'none' }}>
        <input
          type="checkbox"
          checked={completed}
          onChange={onToggle}
        />
        {text}
      </label>
      <button onClick={onDelete} aria-label={`Delete ${text}`}>
        Delete
      </button>
    </li>);
}

export default TodoItem
