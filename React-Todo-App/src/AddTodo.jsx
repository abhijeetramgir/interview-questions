function AddTodo({ handleAddNewTodo, setNewTodo, newTodo }) {
  return (
    <div className="add-todo">
      <form onSubmit={handleAddNewTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          type="submit"
          value="submit"
          disabled={newTodo.trim() === "" ? true : false}
        >
          Add Task
        </button>
      </form>
    </div>
  );
}

export default AddTodo;
