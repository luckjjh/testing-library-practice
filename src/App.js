import React from "react";
import TodoItem from "./Todo";
import { useAxios } from "./axios.hook";

function App() {
  const {loading, todos, error} = useAxios("/todos");

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="todo" data-testid="todos">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

export default App;
