export const localStore = window.localStorage;

export const setInitialTodos = () => {
  const storedTodos = localStore.getItem("todos");

  if (storedTodos) {
    return JSON.parse(storedTodos);
  }

  return [];
};
