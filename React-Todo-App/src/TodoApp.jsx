import { useEffect, useState } from "react";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import "./TodoApp.css";
import { setInitialTodos, localStore } from "./utils/storage";

function TodoApp() {
  const [todos, setTodos] = useState(setInitialTodos);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("https://dummyjson.com/todos");
      const response = await result.json();

      setTodos(response.todos);
      localStore.setItem("todos", JSON.stringify(response.todos));
    };

    if (todos.length === 0) {
      fetchData();
    }
  }, []);

  const handleAddNewTodo = async (event) => {
    event.preventDefault();

    const newTodoPayload = {
      todo: newTodo,
      userId: Math.floor(Math.random() * 200),
      completed: false,
    };
    const response = await fetch("https://dummyjson.com/todos/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodoPayload),
    });
    const newTodoResponse = await response.json();
    const newTodos = [...todos, newTodoResponse];

    setTodos(newTodos);
    localStore.setItem("todos", JSON.stringify(newTodos));
    setNewTodo("");
  };

  const handleDeleteTodo = (clickedTodo) => {
    const newTodos = todos.filter((item) => {
      return item.todo !== clickedTodo.todo && item.id !== clickedTodo.todo;
    });

    setTodos(newTodos);
    localStore.setItem("todos", JSON.stringify(newTodos));
  };

  const handleChangeTodoStatus = (clickedTodo) => {
    const newTodos = todos.map((item) => {
      if (item.todo === clickedTodo.todo) {
        const completed = !item.completed;
        return { ...item, completed };
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
      {todos.length > 0 && (
        <TodoList
          todos={todos}
          handleDeleteTodo={handleDeleteTodo}
          handleChangeTodoStatus={handleChangeTodoStatus}
        />
      )}
    </>
  );
}

export default TodoApp;
