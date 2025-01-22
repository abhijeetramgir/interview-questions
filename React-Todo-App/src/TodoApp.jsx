import { useState } from "react";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import "./TodoApp.css";
import { setInitialTodos, localStore } from "./utils/storage";

function TodoApp() {
  const [todos, setTodos] = useState(setInitialTodos);
  const [newTodo, setNewTodo] = useState("");

  const handleAddNewTodo = (event) => {
    event.preventDefault();
    const newTodos = [
      ...todos,
      {
        name: newTodo,
        status: "Pending",
      },
    ];
    setTodos(newTodos);
    localStore.setItem("todos", JSON.stringify(newTodos));
    setNewTodo("");
  };

  const handleDeleteTodo = (clickedTodo) => {
    const newTodos = todos.filter((item) => {
      return item.name !== clickedTodo.name;
    });
    setTodos(newTodos);
    localStore.setItem("todos", JSON.stringify(newTodos));
  };

  const handleChangeTodoStatus = (clickedTodo) => {
    const newTodos = todos.map((item) => {
      if (item.name === clickedTodo.name) {
        const status = item.status === "Completed" ? "Pending" : "Completed";
        return { name: item.name, status };
      }
      return item;
    });
    setTodos(newTodos);
    localStore.setItem("todos", JSON.stringify(newTodos));
  };

  return (
    <>
      <AddTodo
        handleAddNewTodo={handleAddNewTodo}
        setNewTodo={setNewTodo}
        newTodo={newTodo}
      />
      <TodoList
        todos={todos}
        handleDeleteTodo={handleDeleteTodo}
        handleChangeTodoStatus={handleChangeTodoStatus}
      />
    </>
  );
}

export default TodoApp;
