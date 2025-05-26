import { Trash2 } from 'lucide-react';

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
          className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-600 border-green hover:bg-green"
        />
        {text}
      </label>
      <button
        className="flex-no-shrink p-2 ml-2 text-red-600 border-red hover:text-black hover:bg-red-100 rounded-2xl cursor-pointer"
        onClick={onDelete}
        aria-label={`Delete ${text}`}
      >
        <Trash2 size={16} />
      </button>
    </li>);
}

export default TodoItem
