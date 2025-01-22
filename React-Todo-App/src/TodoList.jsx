import { memo, useState } from "react";
import TodoItem from "./TodoItem";

const TodoList = memo(function TodoList({
  todos,
  handleDeleteTodo,
  handleChangeTodoStatus,
}) {
  const [filter, setFilter] = useState("All");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredTodos =
    filter === "All" ? todos : todos.filter((item) => item.status === filter);

  return (
    <>
      <div className="dropdown">
        <select value={filter} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="todo-list">
        <ul>
          {filteredTodos.map((item) => {
            return (
              <TodoItem
                key={item.name}
                item={item}
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
