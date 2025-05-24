type TodoItemProps = {
  text: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
};

const TodoItem = ({ text, completed, onToggle, onDelete }: TodoItemProps) => {
  return (
    <li className="flex mb-4 items-center">
      <label
        className="w-full text-grey-darkest"
        style={{ textDecoration: completed ? 'line-through' : 'none' }}
      >
        <input
          type="checkbox"
          checked={completed}
          onChange={onToggle}
          className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green"
        />
        {text}
      </label>
      <button
        className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red"
        onClick={onDelete} aria-label={`Delete ${text}`}
      >
        Delete
      </button>
    </li>);
}

export default TodoItem
