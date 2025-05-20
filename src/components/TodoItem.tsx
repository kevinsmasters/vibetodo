type TodoItemProps = {
  text: string;
  id?: number;
};

const TodoItem = ({ text, id }: TodoItemProps) => {
  return <li key={id}>{text}</li>;
}

export default TodoItem
