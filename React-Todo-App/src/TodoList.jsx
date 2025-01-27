import { memo, useState } from "react";
import TodoItem from "./TodoItem";

const TodoList = memo(function TodoList({
  todos,
  handleDeleteTodo,
  handleChangeTodoStatus,
}) {
  const [filter, setFilter] = useState("All");

  const handleFilterChange = (e) => {
    const value = e.target.value;
    const filter = value === "true" ? true : value === "false" ? false : "All";
    setFilter(filter);
  };

  const filteredTodos =
    filter === "All"
      ? todos
      : todos.filter((item) => item.completed === filter);

  return (
    <>
      <div className="dropdown">
        <select value={filter} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value={false}>Pending</option>
          <option value={true}>Completed</option>
        </select>
      </div>
      <div className="todo-list">
        <ul>
          {filteredTodos.map((item, key) => {
            return (
              <TodoItem
                item={item}
                key={`${item.id}+${key}`}
                handleDeleteTodo={handleDeleteTodo}
                handleChangeTodoStatus={handleChangeTodoStatus}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
});

export default TodoList;
