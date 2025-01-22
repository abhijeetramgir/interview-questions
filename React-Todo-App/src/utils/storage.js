export const localStore = window.localStorage;

export const setInitialTodos = () => {
  const initalTodos = [
    {
      name: "todo 1",
      status: "Completed",
    },
    {
      name: "todo 2",
      status: "Completed",
    },
    {
      name: "todo 3",
      status: "Pending",
    },
  ];
  const storedTodos = localStore.getItem("todos");
  if (storedTodos) {
    return JSON.parse(storedTodos);
  }
  localStore.setItem("todos", JSON.stringify(initalTodos));
  return initalTodos;
};
