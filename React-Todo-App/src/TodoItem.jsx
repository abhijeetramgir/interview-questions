import { MdDeleteOutline } from "react-icons/md";

export default function TodoItem({
  item,
  handleDeleteTodo,
  handleChangeTodoStatus,
}) {
  const status = item.completed ? "Completed" : "Pending";

  return (
    <li className="list-container">
      <div className="list-item" onClick={() => handleChangeTodoStatus(item)}>
        <span>{item.todo}</span>
        <span>{status}</span>
      </div>
      <div className="delete-icon">
        <MdDeleteOutline onClick={() => handleDeleteTodo(item)} />
      </div>
    </li>
  );
}
