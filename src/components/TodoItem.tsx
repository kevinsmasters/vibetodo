import type { Todo } from '../types/todoTypes';
type TodoItemProps = Todo;

const TodoItem = ({ text, id }: TodoItemProps) => {
  return <li key={id}>{text}</li>;
}

export default TodoItem
