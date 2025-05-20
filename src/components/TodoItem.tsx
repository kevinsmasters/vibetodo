type TodoItemProps = {
  text: string;
  completed: boolean;
  onToggle: () => void;
};

const TodoItem = ({ text, completed, onToggle }: TodoItemProps) => {
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
    </li>);
}

export default TodoItem
