import { MdDeleteOutline } from "react-icons/md";

export default function TodoItem({
  item,
  handleDeleteTodo,
  handleChangeTodoStatus,
}) {
  return (
    <li className="list-container">
      <div
        className="list-item"
        key={item.name}
        onClick={() => handleChangeTodoStatus(item)}
      >
        <span>{item.name}</span>
        <span>{item.status}</span>
      </div>
      <div className="delete-icon">
        <MdDeleteOutline onClick={() => handleDeleteTodo(item)} />
      </div>
    </li>
  );
}
